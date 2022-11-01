@ECHO off
CALL newman run BDSOL-API.postman_collection.json --folder Create-Entity --working-dir %cd% -g workspace.postman_globals.json -e ./Persons/persons.postman_environment.json --export-environment ./Persons/persons.postman_environment.json -d ./Persons/Create-DataFile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder Update-Entity --working-dir %cd% -g workspace.postman_globals.json -e ./Persons/persons.postman_environment.json --export-environment ./Persons/persons.postman_environment.json -d ./Persons/Update-DataFile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder Search-Entity --working-dir %cd% -g workspace.postman_globals.json -e ./Persons/persons.postman_environment.json --export-environment ./Persons/persons.postman_environment.json -d ./Persons/Search-DataFile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder List-Entity --working-dir %cd% -g workspace.postman_globals.json -e ./Persons/persons.postman_environment.json --export-environment ./Persons/persons.postman_environment.json -d ./Persons/List-Datafile.json --timeout-request 5000
PAUSE
CALL newman run BDSOL-API.postman_collection.json --folder Delete-Entity --working-dir %cd% -g workspace.postman_globals.json -e ./Persons/persons.postman_environment.json --export-environment ./Persons/persons.postman_environment.json --timeout-request 5000
PAUSE