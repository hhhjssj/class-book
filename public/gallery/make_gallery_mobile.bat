@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

title 生成 gallery/mobile 手机版图片

echo.
echo ==========================================
echo      gallery/mobile 手机版图片生成工具
echo ==========================================
echo.

where magick >nul 2>nul
if errorlevel 1 (
    echo [错误] 未检测到 ImageMagick（magick 命令不可用）
    echo 请先确认 ImageMagick 已正确安装，并且已经加入 PATH。
    echo.
    pause
    exit /b 1
)

set "ROOT=%~dp0"
cd /d "%ROOT%"

set "OUT_DIR=%ROOT%mobile"

if not exist "%OUT_DIR%" (
    mkdir "%OUT_DIR%"
)

echo 当前源目录：
echo %ROOT%
echo.
echo 输出目录：
echo %OUT_DIR%
echo.

echo [1/3] 正在生成 JPG 手机版图片...
for %%F in ("%ROOT%*.jpg") do (
    if exist "%%~fF" (
        echo 处理：%%~nxF
        magick "%%~fF" -resize "1280x1280>" -strip -interlace Plane -quality 72 "%OUT_DIR%\%%~nxF"
    )
)

echo.
echo [2/3] 正在生成 JPEG 手机版图片...
for %%F in ("%ROOT%*.jpeg") do (
    if exist "%%~fF" (
        echo 处理：%%~nxF
        magick "%%~fF" -resize "1280x1280>" -strip -interlace Plane -quality 72 "%OUT_DIR%\%%~nxF"
    )
)

echo.
echo [3/3] 正在生成 PNG 手机版图片...
for %%F in ("%ROOT%*.png") do (
    if exist "%%~fF" (
        echo 处理：%%~nxF
        magick "%%~fF" -resize "1280x1280>" -strip -define png:compression-level=9 "%OUT_DIR%\%%~nxF"
    )
)

echo.
echo ==========================================
echo 手机版图片生成完成！
echo 已输出到：
echo %OUT_DIR%
echo ==========================================
echo.
echo 接下来可执行：
echo git add .
echo git commit -m "add mobile gallery images"
echo git push origin main
echo.
pause