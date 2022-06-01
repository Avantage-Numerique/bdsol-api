@ECHO off
CALL newman run BDSOL-API.postman_collection.json --folder 1-Create-all-pers --working-dir %cd% -g workspace.postman_globals.json --export-globals ./workspace.postman_globals.json -e ./Personnes/personnes.postman_environment.json --export-environment ./Personnes/personnes.postman_environment.json -d ./Personnes/Create-DataFile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder 2-Update-all-pers --working-dir %cd% -g workspace.postman_globals.json --export-globals ./workspace.postman_globals.json -e ./Personnes/personnes.postman_environment.json --export-environment ./Personnes/personnes.postman_environment.json -d ./Personnes/Update-DataFile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder 3-Search-all-pers --working-dir %cd% -g workspace.postman_globals.json --export-globals ./workspace.postman_globals.json -e ./Personnes/personnes.postman_environment.json --export-environment ./Personnes/personnes.postman_environment.json -d ./Personnes/Search-DataFile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder 4-List-all-pers --working-dir %cd% -g workspace.postman_globals.json --export-globals ./workspace.postman_globals.json -e ./Personnes/personnes.postman_environment.json --export-environment ./Personnes/personnes.postman_environment.json -d ./Personnes/List-DataFile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder 5-Delete-all-pers --working-dir %cd% -g workspace.postman_globals.json --export-globals ./workspace.postman_globals.json -e ./Personnes/personnes.postman_environment.json --export-environment ./Personnes/personnes.postman_environment.json --timeout-request 5000
PAUSE