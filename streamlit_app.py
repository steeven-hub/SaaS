import streamlit as st
import pandas as pd
import numpy as np
import io
import chardet
from datetime import datetime
from backend.api.data_engine import DataEngine
import plotly.express as px

# Configuration de la page
st.set_page_config(page_title="🚀 Auto-Data Prep SaaS", page_icon="🚀", layout="wide")

# État de session
if 'df' not in st.session_state: st.session_state['df'] = None
if 'filename' not in st.session_state: st.session_state['filename'] = ""

# Navigation
menu = st.sidebar.radio("Navigation", ["📥 Ingestion", "🧹 Nettoyage", "⚙️ Transformation", "🛡️ Qualité", "📤 Export"])

# --- Ingestion ---
if menu == "📥 Ingestion":
    uploaded_file = st.file_uploader("Charger fichier", type=['csv', 'xlsx'])
    if uploaded_file:
        file_bytes = uploaded_file.read()
        df = pd.read_excel(io.BytesIO(file_bytes)) if uploaded_file.name.endswith('.xlsx') else pd.read_csv(io.BytesIO(file_bytes))
        st.session_state['df'] = df
        st.session_state['filename'] = uploaded_file.name
        st.success("Fichier chargé")

# --- Nettoyage ---
elif menu == "🧹 Nettoyage":
    df = st.session_state['df']
    if df is not None:
        col_to_clean = st.selectbox("Colonne", df.columns)
        if st.button("Supprimer Outliers (IQR)"):
            import polars as pl
            df_pl = pl.from_pandas(df)
            df_pl = DataEngine.remove_outliers(df_pl, col_to_clean, method='IQR')
            st.session_state['df'] = df_pl.to_pandas()
            st.rerun()
        st.dataframe(df.head())
    else: st.warning("Chargez un fichier")

# --- Transformation ---
elif menu == "⚙️ Transformation":
    df = st.session_state['df']
    if df is not None:
        st.subheader("Pivotement")
        col_idx = st.selectbox("Index", df.columns)
        col_val = st.selectbox("Valeur", df.select_dtypes(include=[np.number]).columns)
        if st.button("Pivot"):
            import polars as pl
            df_pl = pl.from_pandas(df)
            df_pl = DataEngine.pivot_data(df_pl, index=col_idx, values=col_val)
            st.session_state['df'] = df_pl.to_pandas()
            st.rerun()
    else: st.warning("Chargez un fichier")

# --- Qualité ---
elif menu == "🛡️ Qualité":
    df = st.session_state['df']
    if df is not None:
        st.write(df.describe())
    else: st.warning("Chargez un fichier")

# --- Export ---
elif menu == "📤 Export":
    df = st.session_state['df']
    if df is not None:
        if st.button("Générer Rapport PDF"):
            insights = ["Insight 1", "Insight 2"]
            pdf_bytes = DataEngine.generate_pdf_report(insights, st.session_state['filename'])
            st.download_button("Télécharger PDF", pdf_bytes, "report.pdf", "application/pdf")
        
        # Export Python
        script = "import pandas as pd\n# Pipeline generated\n"
        st.download_button("Télécharger Script Python", script, "pipeline.py", "text/x-python")
    else: st.warning("Chargez un fichier")
