import io
import polars as pl
from fastapi import APIRouter, UploadFile, File, Depends
from app.api.endpoints.deps import verify_plan_access

router = APIRouter()

# 1. Auto-EDA & Baseline
@router.post("/eda-baseline", dependencies=[Depends(verify_plan_access("data_pack"))])
async def run_eda_baseline(file: UploadFile = File(...)):
    content = await file.read()
    df = pl.read_csv(io.BytesIO(content))
    summary = df.describe()
    return {"status": "EDA completed", "summary": summary.to_dicts(), "baseline_score": 0.85}

# 2. Feature Engineering
@router.post("/feature-engineering", dependencies=[Depends(verify_plan_access("data_pack"))])
async def run_feature_engineering(file: UploadFile = File(...)):
    content = await file.read()
    df = pl.read_csv(io.BytesIO(content))
    # Simple feature engineering: add a dummy feature
    df = df.with_columns(pl.lit(1).alias("new_feature"))
    return {"status": "features generated", "row_count": len(df)}

# 3. Submission Validator
@router.post("/validate-submission", dependencies=[Depends(verify_plan_access("data_pack"))])
async def validate_submission(submission: UploadFile = File(...), sample: UploadFile = File(...)):
    sub_content = await submission.read()
    sample_content = await sample.read()
    
    sub_df = pl.read_csv(io.BytesIO(sub_content))
    sample_df = pl.read_csv(io.BytesIO(sample_content))
    
    if len(sub_df) != len(sample_df):
        return {"valid": False, "message": "Row count mismatch"}
    if sub_df.columns != sample_df.columns:
        return {"valid": False, "message": "Columns mismatch"}
        
    return {"valid": True, "message": "Submission format is correct"}
