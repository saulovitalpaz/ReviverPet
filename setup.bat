@echo off
echo Verificando Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js nao encontrado. Instalando via winget...
    winget install OpenJS.NodeJS.LTS --silent --accept-package-agreements --accept-source-agreements
    echo.
    echo Node.js instalado! POR FAVOR, REINICIE ESTE TERMINAL para as mudancas fazerem efeito.
    pause
    exit
) else (
    echo Node.js ja esta instalado.
)

echo.
echo Instalando dependencias do projeto (npm install)...
call npm install
echo.
echo Setup concluido! Agora voce pode usar o start.bat para iniciar o sistema.
pause
