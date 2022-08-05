@ECHO off
CLS
ECHO Start tests.
ECHO 
ECHO Start tests Personnes
CALL ./Personnes/testPersonnes.bat
ECHO Sortie testPersonnes.bat
PAUSE

ECHO 
ECHO Start tests Organisations
CALL ./Organisations/testOrganisations.bat
ECHO Sortie testOrganisations.bat
PAUSE