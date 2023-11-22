@ECHO off
CALL newman run BDSOL-API.postman_collection.json --folder Create-Entity --working-dir %cd% -g workspace.postman_globals.json -e ./Events/events.postman_environment.json --export-environment ./Events/events.postman_environment.json -d ./Events/Create-DataFile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder Update-Entity --working-dir %cd% -g workspace.postman_globals.json -e ./Events/events.postman_environment.json --export-environment ./Events/events.postman_environment.json -d ./Events/Update-DataFile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder Search-Entity --working-dir %cd% -g workspace.postman_globals.json -e ./Events/events.postman_environment.json --export-environment ./Events/events.postman_environment.json -d ./Events/Search-DataFile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder List-Entity --working-dir %cd% -g workspace.postman_globals.json -e ./Events/events.postman_environment.json --export-environment ./Events/events.postman_environment.json -d ./Events/List-Datafile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder Delete-Entity --working-dir %cd% -g workspace.postman_globals.json -e ./Events/events.postman_environment.json --export-environment ./Events/events.postman_environment.json --timeout-request 5000
PAUSE