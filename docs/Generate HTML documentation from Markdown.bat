@echo off

set MarkdownSourceDir=%~dp0
set Markdown2Html="%~dp0Markdown\markdown2html.bat"
set OutputDir="%~dp0Output\"

for %%i in ("%MarkdownSourceDir%\*.md") do call %Markdown2Html% "%%i" %OutputDir% --toc
for %%i in ("%MarkdownSourceDir%\*.index") do call %Markdown2Html% "%%i" %OutputDir%
