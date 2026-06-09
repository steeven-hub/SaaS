import pandas as pd
import numpy as np
from datetime import datetime, timedelta

class MarketDataService:
    @staticmethod
    def generate_sample_data():
        """Génère un dataset réaliste de prix de marchés africains."""
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

        return pd.DataFrame(rows)

    @staticmethod
    def clean_data(df):
        """Nettoie le dataset selon les règles du pipeline."""
        df = df.drop_duplicates()
        df["date"] = pd.to_datetime(df["date"], errors="coerce")
        df = df.dropna(subset=["date", "price"])
        df["price"] = df["price"].astype(float)
        for col in ["product", "unit", "country", "city", "market"]:
            df[col] = df[col].str.lower().str.strip()
        return df

    @staticmethod
    def compute_quality_metrics(df):
        """Calcule les indicateurs de qualité du dataset."""
        metrics = {}
        total_rows = len(df)
        if total_rows == 0:
            return {"error": "Dataset vide"}
            
        total_cells = df.shape[0] * df.shape[1]
        metrics["nombre_lignes"] = total_rows
        metrics["taux_valeurs_manquantes"] = round(df.isnull().sum().sum() / total_cells, 4)
        metrics["taux_doublons"] = round(df.duplicated().sum() / total_rows, 4)
        metrics["prix_anormaux"] = round((df["price"] <= 0).sum() / total_rows, 4)
        metrics["couverture_pays"] = df["country"].nunique()
        metrics["couverture_marches"] = df["market"].nunique()
        metrics["fraicheur_jours"] = (datetime.now() - pd.to_datetime(df["date"]).max()).days
        return metrics
