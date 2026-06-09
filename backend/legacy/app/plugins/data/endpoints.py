from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.responses import StreamingResponse
from app.plugins.data.data_engine import DataEngine
from app.api.endpoints.deps import get_active_user, verify_plan_access
from app.models.user import User
import io

router = APIRouter()

@router.post("/upload", dependencies=[Depends(verify_plan_access("data_pack"))])
async def upload_file(
    file: UploadFile = File(...),
    current_user: User = Depends(get_active_user)
):
    if not file.filename.endswith(('.csv', '.xlsx', '.xls', '.json', '.parquet')):
        raise HTTPException(status_code=400, detail="Invalid format. Supported: .csv, .xlsx, .xls, .json, .parquet")
    
    try:
        content = await file.read()
        excel_output, _ = DataEngine.process_data(content, file.filename)
        
        from urllib.parse import quote
        filename_base = file.filename.split('.')[0]
        safe_filename = quote(f"processed_{filename_base}.xlsx")
        
        return StreamingResponse(
            excel_output,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f"attachment; filename*=UTF-8''{safe_filename}"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

@router.post("/ai-insights", dependencies=[Depends(verify_plan_access("data_pack"))])
async def get_insights(data: str, current_user: User = Depends(get_active_user)):
    return {"insights": DataEngine.get_llm_insights(data)}

@router.post("/generate-pdf", dependencies=[Depends(verify_plan_access("data_pack"))])
async def generate_pdf(insights: list[str], current_user: User = Depends(get_active_user)):
    pdf_bytes = DataEngine.generate_pdf_report(insights)
    return StreamingResponse(
        io.BytesIO(pdf_bytes),
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=report.pdf"}
    )
