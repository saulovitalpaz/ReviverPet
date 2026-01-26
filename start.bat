@echo off
if not exist node_modules (
    echo Erro: Pasta node_modules nao encontrada.
    echo Por favor, execute o arquivo setup.bat primeiro.
    pause
    exit
)

echo Iniciando servidor local...
npm run dev