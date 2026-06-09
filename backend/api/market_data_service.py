import os
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import io
from google import genai
from django.core.cache import cache

class MarketDataService:
    @staticmethod
    def run_full_pipeline():
        """Exécute le pipeline complet : Génération, Ingestion, Nettoyage, Métriques, Rapport, IA."""
        
        # 1. Dossiers
        base_path = "media/pipeline"
        for f in ["raw", "clean", "product", "logs", "docs"]:
            os.makedirs(os.path.join(base_path, f), exist_ok=True)
            
        # 2. Génération
        pays = ["Benin", "Ghana", "Togo"]
        villes = {
            "Benin": ["Cotonou", "Porto-Novo", "Parakou", "Abomey", "Bohicon"],
            "Ghana": ["Accra", "Kumasi", "Tamale", "Takoradi", "Cape Coast"],
            "Togo": ["Lome", "Sokode", "Kara", "Aného", "Dapaong"]
        }
        produits = ["blé", "riz", "huile", "sucre", "wheat", "lait", "œufs", "poisson", "haricots", "tomates"]
        units = {"blé": "kg", "riz": "kg", "huile": "litre", "sucre": "kg", "wheat": "kg", "lait": "litre", "œufs": "douzaine", "poisson": "kg", "haricots": "kg", "tomates": "kg"}
        currencies = {"Benin": "XOF", "Togo": "XOF", "Ghana": "GHS"}

        today = datetime.now()
        dates = [today - timedelta(days=i) for i in range(30)]

        rows = []
        for date in dates:
            for country in pays:
                for city in villes[country]:
                    for product in produits:
                        price = round(np.random.uniform(100, 1000), 2)
                        rows.append({
                            "date": date.strftime("%Y-%m-%d"),
                            "country": country.lower(),
                            "city": city.lower(),
                            "market": f"market_{np.random.randint(1, 6)}",
                            "product": product.lower(),
                            "price": price,
                            "unit": units.get(product, "unit"),
                            "currency": currencies[country],
                            "source": "field survey",
                            "collected_by": f"agent_{np.random.randint(1, 10)}"
                        })

        df_raw = pd.DataFrame(rows)
        raw_path = os.path.join(base_path, "raw/market_prices_raw.csv")
        df_raw.to_csv(raw_path, index=False)

        # 3. Ingestion
        log_path = os.path.join(base_path, "logs/ingestion.log")
        with open(log_path, "a", encoding="utf-8") as log:
            log.write(f"{datetime.now()} | INGESTION OK | rows={len(df_raw)}\n")

        # 4. Nettoyage
        df = df_raw.drop_duplicates()
        df["date"] = pd.to_datetime(df["date"], errors="coerce")
        df = df.dropna(subset=["date", "price"])
        df["price"] = df["price"].astype(float)
        for col in ["product", "unit", "country", "city", "market"]:
            df[col] = df[col].str.lower().str.strip()
        
        clean_path = os.path.join(base_path, "clean/market_prices_clean.csv")
        df.to_csv(clean_path, index=False)

        # 5. Métriques
        total_rows = len(df)
        total_cells = df.shape[0] * df.shape[1]
        metrics = {
            "nombre_lignes": total_rows,
            "taux_valeurs_manquantes": round(df.isnull().sum().sum() / total_cells, 4),
            "taux_doublons": round(df_raw.duplicated().sum() / len(df_raw), 4),
            "prix_anormaux": round((df["price"] <= 0).sum() / total_rows, 4),
            "couverture_pays": int(df["country"].nunique()),
            "couverture_marches": int(df["market"].nunique()),
            "fraicheur_jours": (datetime.now() - df["date"].max()).days
        }

        # 6. Rapport qualité
        report_path = os.path.join(base_path, "docs/data_quality_report.md")
        lines = ["# Data Quality Report — Market Prices Africa V1\n",
                 f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n",
                 "| Metric | Value |",
                 "|-------|-------|"]
        for k, v in metrics.items():
            lines.append(f"| {k} | {v} |")
        with open(report_path, "w", encoding="utf-8") as f:
            f.write("\n".join(lines))

        # 7. Analyse IA
        data_for_ia = df.groupby("product")["price"].mean().reset_index()
        prompt = f"""
        Tu es un expert en data engineering et data produit.
        Données :
        {data_for_ia.to_string(index=False)}
        Question : Analyse les prix moyens et donne :
        1. Résumé des tendances
        2. Observation clé
        3. Recommandation métier
        """
        
        try:
            api_key = os.getenv("GEMINI_API_KEY")
            client = genai.Client(api_key=api_key)
            response = client.models.generate_content(
                model="gemini-3-flash-preview",
                contents=prompt
            )
            ai_analysis = response.text
        except Exception as e:
            ai_analysis = f"Erreur IA : {str(e)}"
            
        return metrics, ai_analysis, report_path
