from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1 import execution

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def read_root():
    return {"message": "Hello FastAPI 🚀"}

@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}

app.include_router(execution.router, prefix="/execute")