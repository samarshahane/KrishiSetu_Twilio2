@echo off
echo ==========================================
echo   LOKSEVA - Full Stack Startup Script (Consolidated)
echo ==========================================
echo.

echo [1/3] Clearing ports 5000, 5173...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5000 :5173"') do (
    taskkill /PID %%a /F >nul 2>&1
)
echo All target ports cleared.
echo.

echo [2/3] Starting Backend (Port 5000)...
start "LOKSEVA Backend" cmd /k "cd /d "%~dp0LokSevaAI_MERN\backend" && npm run dev"

timeout /t 3 /nobreak >nul

echo [3/3] Starting Data Collection (Port 5173)...
start "LOKSEVA Data Collection" cmd /k "cd /d "%~dp0LokSevaAI\data collection" && npm run dev"

echo.
echo ==========================================
echo   Servers started!
echo.
echo   MERN App (API + LP + Dashboard): http://localhost:5000
echo   Data Collection:                 http://localhost:5173
echo ==========================================
pause
