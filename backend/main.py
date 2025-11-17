from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openpyxl
import os

app = FastAPI()

# Permitir que React haga requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Para producción cambia a tu dominio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de usuario
class User(BaseModel):
    name: str
    email: str
    password: str

# Archivo Excel
EXCEL_FILE = "usuarios.xlsx"

# Crear archivo si no existe
if not os.path.exists(EXCEL_FILE):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.append(["Nombre", "Email", "Contraseña"])
    wb.save(EXCEL_FILE)

@app.post("/register")
def register_user(user: User):
    wb = openpyxl.load_workbook(EXCEL_FILE)
    ws = wb.active
    ws.append([user.name, user.email, user.password])
    wb.save(EXCEL_FILE)
    return {"success": True, "message": "Usuario registrado correctamente"}
