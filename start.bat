@echo off
echo Starting EcoFinds Application...

echo.
echo Setting up Backend...
cd backend
start "EcoFinds Backend" cmd /k "npm run dev"

echo.
echo Setting up Frontend...
cd ../frontend
start "EcoFinds Frontend" cmd /k "npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause
