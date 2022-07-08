# Cloud Cost Management and Optimization
Nodejs Rest API example that supports token based authentication with JWT (JSONWebToken) and Role-Based Access Control, on Azure App Service

## Getting started
- Documentation API: https://ccmo-itg.azurewebsites.net/api-docs
- Use Thunder Client or Postman to send requests
- In first, you have to create an account with body contents can be any valid JSON object, for example use like this:
```
{
    "email": "xxxxxxx@xxxxxxx.com",
    "password": "xxxxxxx",
    "groups": ["OCB", "DD"],
    "roles": ["Owner"],
    "projects":["06f1ab5c-42d5-48a3-a078-63e72fd0d099", "6b7f58f0-a973-42f3-91d6-b54585d7e42d"]
}
```

## Config
- create .env file in root folder with MongoDB parameters:
```
APIVERSION=2022-07-01
APIURL=http://xxxxxxxxxxxx
COSMOSDB_USER=xxxxxxxxxxxx
COSMOSDB_PASSWORD=xxxxxxxxxxxx
COSMOSDB_DBNAME=xxxxxxxxxxxx
COSMOSDB_HOST=xxxxxxxxxxxx-mongodb.mongo.cosmos.azure.com
COSMOSDB_PORT=xxxxxxxxxxxx
```
