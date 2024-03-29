@ECHO off
CALL newman run BDSOL-API.postman_collection.json --folder Create-Entity --working-dir %cd% -g workspace.postman_globals.json --export-globals ./workspace.postman_globals.json -e ./Organisations/organisations.postman_environment.json --export-environment ./Organisations/organisations.postman_environment.json -d ./Organisations/Create-DataFile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder Update-Entity --working-dir %cd% -g workspace.postman_globals.json --export-globals ./workspace.postman_globals.json -e ./Organisations/organisations.postman_environment.json --export-environment ./Organisations/organisations.postman_environment.json -d ./Organisations/Update-DataFile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder Search-Entity --working-dir %cd% -g workspace.postman_globals.json --export-globals ./workspace.postman_globals.json -e ./Organisations/organisations.postman_environment.json --export-environment ./Organisations/organisations.postman_environment.json -d ./Organisations/Search-Datafile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder List-Entity --working-dir %cd% -g workspace.postman_globals.json --export-globals ./workspace.postman_globals.json -e ./Organisations/organisations.postman_environment.json --export-environment ./Organisations/organisations.postman_environment.json -d ./Organisations/List-Datafile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder Delete-Entity --working-dir %cd% -g workspace.postman_globals.json --export-globals ./workspace.postman_globals.json -e ./Organisations/organisations.postman_environment.json --export-environment ./Organisations/organisations.postman_environment.json --timeout-request 5000
PAUSE