@echo off

start "" python "dummy.py"  &

start "" node server.js  &

timeout /t 3 /nobreak > NUL  

start "" microsoft-edge:http://localhost:3000  &

REM You can remove the following line if you don't need to specify the Edge path.
where "microsoft-edge" > NUL 2>&1
if exist "%errorlevel%"==0 (
  goto success
) else (
  echo "Warning: Could not find 'microsoft-edge' command. Using default browser."
  start "" http://localhost:3000  &
)

:success
 
