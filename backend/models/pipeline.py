from pydantic import BaseModel

class Node(BaseModel):
    id: str
    type: str
    connfig: dict

class Edge(BaseModel):
    id: str
    source: str
    sourceHandle: str
    target: str
    targetHandle: str

class Pipeline(BaseModel):
    nodes: list[Node]
    edges: list[Edge]