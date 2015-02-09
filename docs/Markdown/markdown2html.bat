@echo off

set pandocCmd="%~dp0Pandoc\pandoc.exe"
set Source=%1
set Directory=%~2
set ExtraArgs=%3 %4 %5 %6 %7 %8 %9
set CSS="%~dp0markdown.css"
set DataDir="%~dp0../Source/"

if "%Directory%" == "" FOR %%f IN (%Source%) DO set Directory=%%~dpf

set OutputName=%%~Source
FOR %%f IN (%Source%) DO (
	set OutputName=%%~nf.html
	set Title=%%~nf)
set OutputPath=%Directory%%Title%

:processMarkdown
%pandocCmd% -f markdown -t html5 --standalone --css %CSS% --highlight-style=haddock %Source% -o "%OutputPath%.html" -V title="%Title%" --template="%~dp0template.html" --data-dir=%DataDir% --self-contained %ExtraArgs% 
echo Generated HTML to "%OutputPath%.html"

:: Uncomment for Microsft Word Format
%pandocCmd% -f markdown -t docx --standalone --css %CSS% --highlight-style=haddock %Source% -o "%OutputPath%.docx" -V title="%Title%" --template="%~dp0template.html" %ExtraArgs%
echo Generated HTML to "%OutputPath%.docx"



