@echo off
title SIH26036 Legal Metrology Verification System Prototype
cd /d "%~dp0"
echo ======================================================================
echo SIH26036: Online Verification System for Weighing & Measuring Instruments
echo Department of Legal Metrology - Hackathon Prototype
echo ======================================================================
echo.
echo Starting prototype server on http://localhost:5173 ...
echo.
start http://localhost:5173
where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    node server.cjs
) else if exist "C:\Program Files\nodejs\node.exe" (
    "C:\Program Files\nodejs\node.exe" server.cjs
) else (
    echo [ERROR] Node.js was not found. Please ensure Node.js is installed.
    echo Looked in PATH and in C:\Program Files\nodejs\node.exe
    pause
)
pause
