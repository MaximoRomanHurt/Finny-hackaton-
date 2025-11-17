from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Ajusta el origen al que uses en desarrollo (Vite por defecto usa 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    password: str
    name: Optional[str] = None

# Almacenamiento en memoria (sólo para demo)
users = {}

# Transacciones en memoria (demo)
transactions = [
    {"id": 1, "category": "Comida", "amount": -45.0},
    {"id": 2, "category": "Salario", "amount": 1500.0},
    {"id": 3, "category": "Transporte", "amount": -25.0},
]

@app.post("/api/register")
async def register(req: RegisterRequest):
    if req.email in users:
        raise HTTPException(status_code=400, detail="User already exists")
    users[req.email] = {"password": req.password, "name": req.name}
    return {"message": "registered"}

@app.post("/api/login")
async def login(req: LoginRequest):
    user = users.get(req.email)
    if not user or user["password"] != req.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    # En un backend real devolverías un JWT u otro token
    return {"message": "ok", "token": "fake-jwt-token"}

@app.get("/api/hello")
async def hello():
    return {"message": "Hello from backend"}


@app.get("/api/summary")
async def summary():
    total_income = sum(t["amount"] for t in transactions if t["amount"] > 0)
    total_expense = -sum(t["amount"] for t in transactions if t["amount"] < 0)
    balance = total_income - total_expense
    # Formatea a 2 decimales
    return {
        "balance": round(balance, 2),
        "income": round(total_income, 2),
        "expense": round(total_expense, 2),
        "transactions": transactions,
    }


class TransactionIn(BaseModel):
    category: str
    amount: float


@app.post("/api/transaction")
async def add_transaction(t: TransactionIn):
    new_id = max((tx["id"] for tx in transactions), default=0) + 1
    tx = {"id": new_id, "category": t.category, "amount": t.amount}
    transactions.append(tx)
    return {"message": "ok", "transaction": tx}
