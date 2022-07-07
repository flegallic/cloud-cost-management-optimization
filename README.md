# cloud-cost-management-optimization
Nodejs Rest API example that supports token based authentication with JWT (JSONWebToken) and Role-Based Access Control, on Azure App Service

## Getting started DEMO
- Use Thunder Client or Postman to send requests
- In first, you have to create an account with body contents can be any valid JSON object, for example like this: \
POST Request [https://ccmo-itg.azurewebsites.net/api/common/auth/signup]
```
{
    "email": "xxxxxxx@xxxxxxx.com",
    "password": "xxxxxxx",
    "groups": ["OCB", "DD"],
    "roles": ["Owner"],
    "projects":["06f1ab5c-42d5-48a3-a078-63e72fd0d099", "6b7f58f0-a973-42f3-91d6-b54585d7e42d"]
}
``` \
Response:
```
{
  "status": {
    "code": "200",
    "message": "Account has been created with successfully. Keep the personal information safe !",
    "uuid": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "email": "xxxxxxx@xxxxxxx.com",
    "password": "{{password}}"
  }
}
```

- Log in and get a token \
POST Request [https://ccmo-itg.azurewebsites.net/api/common/auth/authorize?apiversion=2022-07-01] \
Response:
```
{
  "ccmo_access_key_id": "PgKZo6J8-eTHfwgyezfzefWd7/_JX",
  "ccmo_secret_access_key": "YwADed46lO8UGoLStjlvqN53_gfzefzefzfKMtptR8.-p",
  "groups": [
    "OCB",
    "DD"
  ],
  "roles": [
    "Owner"
  ],
  "projects": "Project1, Project3 - uuid: 06f1ab5c-42d5-48a3-a078-63e72fd0d099, 6b7f58f0-a973-42f3-91d6-b54585d7e42d",
  "authorization_request_url": "https://ccmo-itg.azurewebsites.net/api/{{business_unit}}/{{project_id}}",
  "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzc1NzRiNGZjYjE4Mzc4ZDg0ODQxNCIsImlhdCI6MTY1NzIzMTM5NiwiZXhwIjoxNjU3MjMxOTk2fQ.u6nagN_fp42PN8hxawHMfQJ_L651xyBkXWZoYjj05gfoGqr3bstsAXexWqtwpS1lg-s1orBgyEs3QQkukyukyjtyjtyjrtgQ",
  "expiresIn": "600s"
}
```

- Home page url 
GET Request [https://ccmo-itg.azurewebsites.net/api]
- Business Unit url
GET Request [https://ccmo-itg.azurewebsites.net/api/{{business_unit}}]
- Project url
GET Request [https://ccmo-itg.azurewebsites.net/api/{{business_unit}}/{{project_id}}]

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
