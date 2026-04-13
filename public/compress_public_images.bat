@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

title Public 图片一键压缩

echo.
echo ==========================================
echo        Public 图片一键压缩工具
echo ==========================================
echo.

where magick >nul 2>nul
if errorlevel 1 (
    echo [错误] 未检测到 ImageMagick（magick 命令不可用）
    echo 请先确认 ImageMagick 已正确安装并加入 PATH。
    echo.
    pause
    exit /b 1
)

set "ROOT=%~dp0"
cd /d "%ROOT%"

echo 当前处理目录：
echo %ROOT%
echo.

set "BACKUP_DIR=%ROOT%_backup_before_compress"

if not exist "%BACKUP_DIR%" (
    echo [1/5] 正在创建备份目录...
    mkdir "%BACKUP_DIR%"
    echo 备份目录：%BACKUP_DIR%
    echo.
    echo 正在备份原图，请稍候...
    xcopy "%ROOT%*.jpg" "%BACKUP_DIR%\" /S /I /Y >nul 2>nul
    xcopy "%ROOT%*.jpeg" "%BACKUP_DIR%\" /S /I /Y >nul 2>nul
    xcopy "%ROOT%*.png" "%BACKUP_DIR%\" /S /I /Y >nul 2>nul
    echo 备份完成。
) else (
    echo [1/5] 检测到已有备份目录，跳过备份：
    echo %BACKUP_DIR%
)

echo.
echo [2/5] 开始压缩 JPG 文件...
for /r "%ROOT%" %%F in (*.jpg) do (
    echo 处理：%%~fF
    magick mogrify -resize "1800x1800>" -strip -interlace Plane -quality 78 "%%~fF"
)

echo.
echo [3/5] 开始压缩 JPEG 文件...
for /r "%ROOT%" %%F in (*.jpeg) do (
    echo 处理：%%~fF
    magick mogrify -resize "1800x1800>" -strip -interlace Plane -quality 78 "%%~fF"
)

echo.
echo [4/5] 开始压缩 PNG 文件...
for /r "%ROOT%" %%F in (*.png) do (
    echo 处理：%%~fF
    magick mogrify -resize "1800x1800>" -strip -define png:compression-level=9 "%%~fF"
)

echo.
echo [5/5] 全部处理完成
echo.
echo ==========================================
echo 压缩完成！
echo 原图备份位置：
echo %BACKUP_DIR%
echo ==========================================
echo.
pause