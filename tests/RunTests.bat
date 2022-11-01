@ECHO off
CLS
ECHO Generating DevToken
CALL newman run BDSOL-API.postman_collection.json --folder "Dev Token" --working-dir %cd% -g workspace.postman_globals.json --export-globals ./workspace.postman_globals.json --timeout-request 5000


ECHO Creating environment variables
CALL newman run BDSOL-API.postman_collection.json --folder CreateEnvVariable-org --working-dir %cd% -g workspace.postman_globals.json -e ./Organisations/Organisations.postman_environment.json --export-environment ./Organisations/Organisations.postman_environment.json --timeout-request 5000
CALL newman run BDSOL-API.postman_collection.json --folder CreateEnvVariable-pers --working-dir %cd% -g workspace.postman_globals.json -e ./Persons/persons.postman_environment.json --export-environment ./Persons/persons.postman_environment.json --timeout-request 5000
CALL newman run BDSOL-API.postman_collection.json --folder CreateEnvVariable-taxo --working-dir %cd% -g workspace.postman_globals.json -e ./Taxonomies/Taxonomies.postman_environment.json --export-environment ./Taxonomies/Taxonomies.postman_environment.json --timeout-request 5000
CALL newman run BDSOL-API.postman_collection.json --folder CreateEnvVariable-usr --working-dir %cd% -g workspace.postman_globals.json -e ./Users/Users.postman_environment.json --export-environment ./Users/Users.postman_environment.json --timeout-request 5000
ECHO Done creating environment variables


ECHO Start tests.
ECHO 
ECHO Start tests Persons
CALL ./Persons/testPersons.bat
ECHO Sortie testPersons.bat
PAUSE

ECHO 
ECHO Start tests Organisations
CALL ./Organisations/testOrganisations.bat
ECHO Sortie testOrganisations.bat
PAUSE

ECHO 
ECHO Start tests Taxonomies
CALL ./Taxonomies/testTaxonomies.bat
ECHO Sortie testTaxonomies.bat
PAUSE

ECHO 
ECHO Start tests Users
CALL ./Users/testUsers.bat
ECHO Sortie testTUsers.bat
PAUSE