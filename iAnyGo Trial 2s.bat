@echo off
:loop
reg delete HKEY_CURRENT_USER\Software\Siacgltiyg\SiaData\MFTimes /v JoystickMovementTrialTime /f
reg add HKEY_CURRENT_USER\Software\Siacgltiyg\SiaData\MFTimes /v manypoint /t REG_SZ /d Az+foJSad0P/kFw1nTAWPA== /f
reg add HKEY_CURRENT_USER\Software\Siacgltiyg\SiaData\MFTimes /v position /t REG_SZ /d Az+foJSad0P/kFw1nTAWPA== /f
reg add HKEY_CURRENT_USER\Software\Siacgltiyg\SiaData\MFTimes /v simplepoint /t REG_SZ /d Az+foJSad0P/kFw1nTAWPA== /f

rem Đợi 2 giây, nobreak chặn bấm phím để bỏ qua độ trễ, >nul ẩn thông báo đợi
timeout /t 2 /nobreak >nul

goto loop