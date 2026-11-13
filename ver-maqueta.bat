@echo off
cd /d "%~dp0"
set PY=
where py >nul 2>nul && set PY=py
if not defined PY where python >nul 2>nul && set PY=python
if not defined PY goto sinpython
echo.
echo  Maqueta de Uniformes Farfaglia en http://localhost:8000
echo  Para detenerla, cerra esta ventana.
echo.
start "" cmd /c "timeout /t 2 >nul & start http://localhost:8000"
%PY% -m http.server 8000
goto fin
:sinpython
echo.
echo  No se encontro Python. Se abre index.html directamente.
start "" "%~dp0index.html"
:fin
pause
