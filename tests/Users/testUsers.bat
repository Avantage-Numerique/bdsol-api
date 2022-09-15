@ECHO off
CALL newman run BDSOL-API.postman_collection.json --folder Create-Entity --working-dir %cd% -g workspace.postman_globals.json -e ./Users/Users.postman_environment.json --export-environment ./Users/Users.postman_environment.json -d ./Users/Create-DataFile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder Update-Entity --working-dir %cd% -g workspace.postman_globals.json -e ./Users/Users.postman_environment.json --export-environment ./Users/Users.postman_environment.json -d ./Users/Update-DataFile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder Delete-Entity --working-dir %cd% -g workspace.postman_globals.json -e ./Users/Users.postman_environment.json --export-environment ./Users/Users.postman_environment.json --timeout-request 5000
PAUSE