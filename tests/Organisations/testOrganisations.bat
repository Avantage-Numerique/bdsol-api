@ECHO off
CALL newman run BDSOL-API.postman_collection.json --folder 1-Create-all-org --working-dir %cd% -g workspace.postman_globals.json --export-globals ./workspace.postman_globals.json -e ./Organisations/organisations.postman_environment.json --export-environment ./Organisations/organisations.postman_environment.json -d ./Organisations/Create-DataFile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder 2-Update-all-org --working-dir %cd% -g workspace.postman_globals.json --export-globals ./workspace.postman_globals.json -e ./Organisations/organisations.postman_environment.json --export-environment ./Organisations/organisations.postman_environment.json -d ./Organisations/Update-DataFile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder 3-Search-all-org --working-dir %cd% -g workspace.postman_globals.json --export-globals ./workspace.postman_globals.json -e ./Organisations/organisations.postman_environment.json --export-environment ./Organisations/organisations.postman_environment.json -d ./Organisations/Search-DataFile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder 4-List-all-org --working-dir %cd% -g workspace.postman_globals.json --export-globals ./workspace.postman_globals.json -e ./Organisations/organisations.postman_environment.json --export-environment ./Organisations/organisations.postman_environment.json -d ./Organisations/List-DataFile.json --timeout-request 5000
PAUSE