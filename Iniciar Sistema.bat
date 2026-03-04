@echo off
setlocal
cd /d %~dp0
echo ==========================================
echo    REVIVER PET - Iniciando Sistema
echo ==========================================
echo.
echo [1/3] Verificando dependencias...
python -m pip install -r requirements.txt --quiet

echo [2/3] Iniciando Servidor API (em segundo plano)...
:: Inicia o uvicorn minimizado para não atrapalhar
start "ReviverPet Server" /min python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000

echo [3/3] Aguardando o servidor estabilizar...
timeout /T 3 /NOBREAK > nul

echo.
echo Abrindo o sistema...
start chrome.exe --app=http://127.0.0.1:8000
if %ERRORLEVEL% NEQ 0 (
    start http://127.0.0.1:8000
)

echo.
echo Pronto! Voce pode fechar esta janela se desejar.
echo O servidor continuara rodando minimizado na barra de tarefas.
timeout /T 5 > nul
exit

