@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

title Gallery 图片一键压缩

echo.
echo ==========================================
echo      Gallery 图片一键压缩工具
echo ==========================================
echo.

REM ====== 检查 ImageMagick 是否已安装 ======
where magick >nul 2>nul
if errorlevel 1 (
    echo [错误] 未检测到 ImageMagick（magick 命令不可用）
    echo 请先安装 ImageMagick，并确保已加入系统环境变量。
    echo.
    pause
    exit /b 1
)

REM ====== 当前脚本所在目录，默认就是 gallery 目录 ======
set "ROOT=%~dp0"
cd /d "%ROOT%"

echo 当前处理目录：
echo %ROOT%
echo.

REM ====== 备份目录 ======
set "BACKUP_DIR=%ROOT%_backup_before_compress"

if not exist "%BACKUP_DIR%" (
    echo [1/4] 正在创建备份目录...
    mkdir "%BACKUP_DIR%"
    echo 备份目录：%BACKUP_DIR%
    echo.
    echo 正在备份原图，请稍候...
    xcopy "%ROOT%*.jpg" "%BACKUP_DIR%\" /S /I /Y >nul 2>nul
    xcopy "%ROOT%*.jpeg" "%BACKUP_DIR%\" /S /I /Y >nul 2>nul
    xcopy "%ROOT%*.png" "%BACKUP_DIR%\" /S /I /Y >nul 2>nul
    echo 备份完成。
) else (
    echo [1/4] 检测到已有备份目录，跳过备份：
    echo %BACKUP_DIR%
)

echo.
echo [2/4] 开始压缩 JPG 文件...
for /r "%ROOT%" %%F in (*.jpg) do (
    echo 处理：%%~fF
    magick mogrify -resize "1800x1800>" -strip -interlace Plane -quality 78 "%%~fF"
)

echo.
echo [3/4] 开始压缩 JPEG 文件...
for /r "%ROOT%" %%F in (*.jpeg) do (
    echo 处理：%%~fF
    magick mogrify -resize "1800x1800>" -strip -interlace Plane -quality 78 "%%~fF"
)

echo.
echo [4/4] 开始压缩 PNG 文件...
for /r "%ROOT%" %%F in (*.png) do (
    echo 处理：%%~fF
    magick mogrify -resize "1800x1800>" -strip -define png:compression-level=9 "%%~fF"
)

echo.
echo ==========================================
echo 压缩完成！
echo 原图备份位置：
echo %BACKUP_DIR%
echo ==========================================
echo.
echo 接下来你可以执行：
echo git add .
echo git commit -m "compress gallery images"
echo git push origin main
echo.
pause