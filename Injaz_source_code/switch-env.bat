@echo off
REM Injaz Rent A Car - Environment Switcher (Windows)
REM This script helps you easily switch between local development and production environments

echo 🚗 Injaz Rent A Car - Environment Switcher
echo ==========================================

REM Check if helper.js exists
if not exist "src\utils\helper.js" (
    echo ❌ Error: src\utils\helper.js not found!
    echo Please run this script from the frontend project root directory.
    pause
    exit /b 1
)

echo.
echo Current configuration:
echo =====================

REM Check current configuration
findstr /C:"http://localhost:4000" src\utils\helper.js >nul
if %errorlevel% equ 0 (
    echo 📍 Current: LOCAL DEVELOPMENT (localhost:4000)
    goto :menu
)

findstr /C:"https://injazrent.ae/api" src\utils\helper.js >nul
if %errorlevel% equ 0 (
    echo 📍 Current: PRODUCTION (api.logicrent.ae)
    goto :menu
)

echo 📍 Current: AUTO-DETECT (based on hostname)

:menu
echo.
echo Choose environment:
echo 1) Local Development (localhost:4000)
echo 2) Production (api.logicrent.ae)
echo 3) Auto-detect (recommended)
echo 4) Show current status
echo 5) Exit

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto :local
if "%choice%"=="2" goto :production
if "%choice%"=="3" goto :autodetect
if "%choice%"=="4" goto :status
if "%choice%"=="5" goto :exit
echo ❌ Invalid choice. Please run the script again.
pause
exit /b 1

:local
echo 🔄 Switching to LOCAL DEVELOPMENT...
powershell -Command "(Get-Content 'src\utils\helper.js') -replace 'export const serverUrl = .*', 'export const serverUrl = \"http://localhost:4000\";' | Set-Content 'src\utils\helper.js'"
echo ✅ Switched to LOCAL DEVELOPMENT
echo 📝 Make sure your backend is running on port 4000
goto :end

:production
echo 🔄 Switching to PRODUCTION...
powershell -Command "(Get-Content 'src\utils\helper.js') -replace 'export const serverUrl = .*', 'export const serverUrl = \"https://injazrent.ae/api\";' | Set-Content 'src\utils\helper.js'"
echo ✅ Switched to PRODUCTION
goto :end

:autodetect
echo 🔄 Switching to AUTO-DETECT...
echo // Environment-based API configuration > src\utils\helper.js
echo const getServerUrl = () =^> { >> src\utils\helper.js
echo   // Check if we're in development mode >> src\utils\helper.js
echo   if (typeof window !== 'undefined') { >> src\utils\helper.js
echo     // Client-side: check if we're on localhost >> src\utils\helper.js
echo     if (window.location.hostname === 'localhost' ^|^| window.location.hostname === '127.0.0.1') { >> src\utils\helper.js
echo       return 'http://localhost:4000'; >> src\utils\helper.js
echo     } >> src\utils\helper.js
echo   } >> src\utils\helper.js
echo. >> src\utils\helper.js
echo   // Check environment variable (if available) >> src\utils\helper.js
echo   if (typeof process !== 'undefined' ^&^& process.env.NEXT_PUBLIC_API_URL) { >> src\utils\helper.js
echo     return process.env.NEXT_PUBLIC_API_URL; >> src\utils\helper.js
echo   } >> src\utils\helper.js
echo. >> src\utils\helper.js
echo   // Default to production for server-side rendering >> src\utils\helper.js
echo   return 'https://injazrent.ae/api'; >> src\utils\helper.js
echo }; >> src\utils\helper.js
echo. >> src\utils\helper.js
echo export const serverUrl = getServerUrl(); >> src\utils\helper.js
echo. >> src\utils\helper.js
echo // For easy switching during development, you can manually override: >> src\utils\helper.js
echo // export const serverUrl = "http://localhost:4000";  // Local development >> src\utils\helper.js
echo // export const serverUrl = "https://injazrent.ae/api"; // Production >> src\utils\helper.js
echo ✅ Switched to AUTO-DETECT
echo 📝 Will use localhost:4000 for local development and api.logicrent.ae for production
goto :end

:status
echo.
echo 📊 Current Status:
echo =================
tasklist /FI "IMAGENAME eq node.exe" /FO CSV | findstr /C:"next dev" >nul
if %errorlevel% equ 0 (
    echo Frontend: ✅ Running on port 3000
) else (
    echo Frontend: ❌ Not running
)

tasklist /FI "IMAGENAME eq node.exe" /FO CSV | findstr /C:"nodemon" >nul
if %errorlevel% equ 0 (
    echo Backend:  ✅ Running on port 4000
) else (
    echo Backend:  ❌ Not running
)

echo.
echo 🌐 Access URLs:
echo Frontend: http://localhost:3000/en/
echo Admin:    http://localhost:3000/en/pages/adminPage/
echo Backend:  http://localhost:4000
goto :end

:exit
echo 👋 Goodbye!
pause
exit /b 0

:end
echo.
echo 🎉 Configuration updated successfully!
echo 💡 Restart your frontend development server to apply changes:
echo    npm run dev
pause
