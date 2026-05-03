from fastapi import APIRouter

router = APIRouter()

@router.post("/")
async def run_pipeline():
    return { "results": [] }

