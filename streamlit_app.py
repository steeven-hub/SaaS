import streamlit as st
import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.metrics import accuracy_score, mean_absolute_error, r2_score
import plotly.express as px
import os

# --- CONFIGURATION DE LA PAGE ---
st.set_page_config(page_title="SaaS-Data Engine | Prep", layout="wide", page_icon="🚀")

# Custom CSS for branding
st.markdown("""
    <style>
    .main {
        background-color: #0f172a;
        color: #f8fafc;
    }
    .stButton>button {
        background-color: #2dd4bf;
        color: #0f172a;
        font-weight: bold;
    }
    .stMetric {
        background-color: #1e293b;
        padding: 15px;
        border-radius: 10px;
        border: 1px solid #334155;
    }
    </style>
    """, unsafe_allow_html=True)

st.title("🚀 SaaS-Data Engine : Intelligence Données")
st.caption("Plateforme d'Auto-EDA et Machine Learning optimisée pour le Sénégal.")

# --- GESTION DE L'ÉTAT ---
if 'df' not in st.session_state:
    st.session_state['df'] = None
if 'history' not in st.session_state:
    st.session_state['history'] = []

def log_action(action):
    st.session_state['history'].append(action)

# --- BARRE LATÉRALE ---
st.sidebar.title("Navigation")
menu = st.sidebar.radio("Modules", ["1. Ingestion", "2. Nettoyage", "3. Auto-EDA", "4. Auto-ML", "5. Qualité & Export"])

# 1. INGESTION
if menu == "1. Ingestion":
    st.header("📥 Ingestion de Données")
    uploaded_file = st.file_uploader("Charger CSV, Excel ou JSON", type=['csv', 'xlsx', 'json'])
    if uploaded_file:
        try:
            if uploaded_file.name.endswith('.csv'): df = pd.read_csv(uploaded_file)
            elif uploaded_file.name.endswith('.xlsx'): df = pd.read_excel(uploaded_file)
            else: df = pd.read_json(uploaded_file)
            st.session_state['df'] = df
            st.success("Chargé !")
        except Exception as e: st.error(str(e))
    if st.session_state['df'] is not None:
        st.dataframe(st.session_state['df'].head(10), use_container_width=True)

# 2. NETTOYAGE
elif menu == "2. Nettoyage":
    st.header("🧹 Nettoyage Automatique")
    df = st.session_state['df']
    if df is not None:
        c1, c2 = st.columns(2)
        with c1:
            if st.button("Supprimer les doublons"):
                st.session_state['df'] = df.drop_duplicates()
                st.success("Doublons supprimés")
        with c2:
            if st.button("Imputer valeurs manquantes (Auto)"):
                for col in df.columns:
                    if df[col].dtype in [np.float64, np.int64]:
                        df[col] = df[col].fillna(df[col].median())
                    else:
                        df[col] = df[col].fillna(df[col].mode()[0] if not df[col].mode().empty else "N/A")
                st.session_state['df'] = df
                st.success("Imputation terminée")
    else: st.warning("Chargez un fichier")

# 3. AUTO-EDA
elif menu == "3. Auto-EDA":
    st.header("📊 Auto-EDA : Exploration")
    df = st.session_state['df']
    if df is not None:
        st.write(df.describe())
        num_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        if num_cols:
            col = st.selectbox("Variable à visualiser", num_cols)
            st.plotly_chart(px.histogram(df, x=col, color_discrete_sequence=['#2dd4bf']), use_container_width=True)
            if len(num_cols) >= 2:
                st.subheader("Corrélations")
                st.plotly_chart(px.imshow(df[num_cols].corr(), text_auto=True), use_container_width=True)
    else: st.warning("Chargez un fichier")

# 4. AUTO-ML
elif menu == "4. Auto-ML":
    st.header("🤖 Auto-ML : Prédictions")
    df = st.session_state['df']
    if df is not None:
        target = st.selectbox("Cible (Y)", df.columns)
        if st.button("Entraîner Modèle"):
            X = df.drop(columns=[target])
            y = df[target]
            for col in X.select_dtypes(include=['object']).columns:
                X[col] = LabelEncoder().fit_transform(X[col].astype(str))
            is_clf = y.dtype == 'object' or len(y.unique()) < 20
            if is_clf:
                y = LabelEncoder().fit_transform(y.astype(str))
                model = RandomForestClassifier()
            else:
                model = RandomForestRegressor()
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
            model.fit(X_train, y_train)
            y_pred = model.predict(X_test)
            if is_clf: st.metric("Accuracy", f"{accuracy_score(y_test, y_pred):.2%}")
            else: st.metric("R2 Score", f"{r2_score(y_test, y_pred):.4f}")
            st.success("Modèle prêt !")
    else: st.warning("Chargez un fichier")

# 5. EXPORT
elif menu == "5. Qualité & Export":
    st.header("💾 Exportation")
    df = st.session_state['df']
    if df is not None:
        st.download_button("Télécharger CSV", df.to_csv(index=False).encode('utf-8'), "clean_data.csv", "text/csv")
    else: st.warning("Chargez un fichier")
