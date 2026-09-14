@echo off
title The Bones of the Disir Queen - Offline Preview
cd /d "%~dp0"

echo.
echo  THE BONES OF THE DISIR QUEEN - OFFLINE PREVIEW
echo  ------------------------------------------------
echo  Computer: http://localhost:8000
echo  TV/phone: http://YOUR-COMPUTER-IP:8000
echo.
echo  Keep this window open while reviewing the site.
echo  Press Ctrl+C to stop the preview.
echo.

start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://localhost:8000'"
py -m http.server 8000 --directory dist

if errorlevel 1 (
  echo.
  echo Python did not start. Install Python from python.org, then run this file again.
  pause
)
