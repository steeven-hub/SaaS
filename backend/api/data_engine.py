import polars as pl
import pandas as pd
import io
import os
import hashlib
from google import genai
from fpdf import FPDF
from django.core.cache import cache

class DataEngine:
    @staticmethod
    def get_llm_insights(summary_stats: str) -> str:
        # Create a unique key based on the input text
        cache_key = f"llm_insight_{hashlib.md5(summary_stats.encode()).hexdigest()}"
        cached_insight = cache.get(cache_key)
        
        if cached_insight:
            return cached_insight

        try:
            # Use GEMINI_API_KEY as primary, fallback to OPENAI_API_KEY for convenience during transition
            api_key = os.getenv("GEMINI_API_KEY") or os.getenv("OPENAI_API_KEY")
            if not api_key:
                return "AI Insights are currently unavailable (API Key not configured)."
            
            # Unified Client (supports both AI Studio and Vertex AI)
            client = genai.Client(api_key=api_key)
            
            prompt = (
                "You are a Senior Business Consultant. analyze the following statistical summary of a dataset "
                "and provide 3 deep strategic insights for a CEO. Focus on trends, anomalies, or opportunities. "
                "Format as a clean markdown list.\n\n"
                f"DATA SUMMARY:\n{summary_stats}"
            )
            
            # Using the modern SDK and the specific model requested
            response = client.models.generate_content(
                model="gemini-3-flash-preview",
                contents=prompt
            )
            insight = response.text
            
            cache.set(cache_key, insight, 86400)
            return insight
        except Exception as e:
            return f"Could not generate AI insight with Gemini 3: {str(e)}"

    @staticmethod
    def generate_pdf_report(insights: list, filename: str = "Analysis") -> bytes:
        class PDF(FPDF):
            def header(self):
                # Branding
                self.set_fill_color(15, 23, 42) # Dark background matching UI
                self.rect(0, 0, 210, 40, 'F')
                self.set_text_color(45, 212, 191) # Teal color
                self.set_font("helvetica", 'B', 24)
                self.cell(0, 20, "Afrihealth Data Engine", ln=True, align='L')
                self.set_font("helvetica", 'I', 10)
                self.set_text_color(148, 163, 184)
                self.cell(0, 5, "Intelligent Business Insights Report", ln=True, align='L')
                self.ln(10)

            def footer(self):
                self.set_y(-15)
                self.set_font("helvetica", 'I', 8)
                self.set_text_color(128)
                self.cell(0, 10, f"Page {self.page_no()} | Confidential AI-Generated Report", align='C')

        pdf = PDF()
        pdf.add_page()
        pdf.set_font("helvetica", size=12)
        pdf.set_text_color(30, 41, 59)
        
        pdf.set_font("helvetica", 'B', 14)
        pdf.cell(0, 10, f"Subject: Data Analysis for {filename}", ln=True)
        pdf.ln(5)
        
        pdf.set_font("helvetica", 'B', 12)
        pdf.cell(0, 10, "Strategic AI Insights:", ln=True)
        pdf.set_font("helvetica", size=11)
        
        for insight in insights:
            # Clean markdown-style bullets if present
            clean_text = insight.replace("**", "").replace("#", "")
            pdf.multi_cell(0, 8, txt=clean_text)
            pdf.ln(2)
            
        return pdf.output()

    @staticmethod
    def process_data(file_content: bytes, filename: str):
        # Universal Ingestion
        if filename.endswith('.csv'):
            df = pl.read_csv(io.BytesIO(file_content))
        elif filename.endswith(('.xls', '.xlsx')):
            df = pl.read_excel(io.BytesIO(file_content))
        elif filename.endswith('.json'):
            df = pl.read_json(io.BytesIO(file_content))
        else:
            # Re-read with pandas for broader support if polars fails
            try:
                pd_df = pd.read_excel(io.BytesIO(file_content))
                df = pl.from_pandas(pd_df)
            except Exception:
                raise ValueError(f"Unsupported or corrupted file format: {filename}")

        # Data Profiling & Statistics for AI
        desc = df.describe().to_pandas().to_string()
        
        # Calculate Correlation Matrix (for Pillar 3)
        corr_data = {}
        num_df = df.select(pl.col(pl.Float64, pl.Int64))
        if len(num_df.columns) >= 2:
            corr_matrix = num_df.to_pandas().corr()
            corr_data = corr_matrix.to_dict()

        # AI Insight with Statistics
        ai_insight = DataEngine.get_llm_insights(desc)
        
        insights = [
            f"Dataset: {filename}",
            f"Observations: {len(df)} rows | {len(df.columns)} columns",
            f"Data Quality: {df.null_count().sum().sum()} missing values identified.",
            ai_insight
        ]

    @staticmethod
    def clean_text(df, col_name, operations):
        """Applies various NLP cleaning operations."""
        if "Minuscules" in operations:
            df[col_name] = df[col_name].str.to_lowercase()
        if "Supprimer espaces" in operations:
            df[col_name] = df[col_name].str.strip()
        # Note: Polars regex handling is different from pandas, kept simple for now
        return df

    @staticmethod
    def remove_outliers(df, col_name, method='Z-Score'):
        """Handles outliers using Z-Score or IQR."""
        if method == 'Z-Score':
            mean = df[col_name].mean()
            std = df[col_name].std()
            z_scores = (df[col_name] - mean) / std
            df = df.filter((z_scores.abs() <= 3))
        elif method == 'IQR':
            q1 = df[col_name].quantile(0.25)
            q3 = df[col_name].quantile(0.75)
            iqr = q3 - q1
            lower = q1 - 1.5 * iqr
            upper = q3 + 1.5 * iqr
            df = df.filter((df[col_name] >= lower) & (df[col_name] <= upper))
        return df

    @staticmethod
    def pivot_data(df, index, values, aggfunc='mean'):
        """Pivots data based on specified parameters."""
        return df.pivot(index=index, values=values, aggregate=aggfunc)

    @staticmethod
    def merge_data(df1, df2, on, how='inner'):
        """Merges two dataframes."""
        return df1.join(df2, on=on, how=how)
