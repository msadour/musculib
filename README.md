# Documentation about Musculib

## Presentation
Musculib is a web application that use an API that provides fitness exercices. To see the Database schema (UML), 
please have a look on the file "database schema.png"


## Technologies used
This project uses the followed technologies :
* _Python_
* _Django_
* _React.js_
* _PostgreSQL_
* _Docker_


## Installation
* Install Docker and Docker compose ;
* Clone the project ;
* Install webpack locally (npm i -D webpack webpack-cli)
* For launch the API server : **docker-compose down && sudo docker-compose build && sudo docker-compose up**
* In another terminal, load your react app : **npm run dev**

## Launching
* Locally, you will have the access to the app by clicking on http://0.0.0.0:3000/
* The react code is in /frontend/src

## Structure of API Data
### Exercice
API URL: http://0.0.0.0:3000/api_musculib/exercice/

### User
{
    "id": 1,<br />
    "password": "password",<br />
    "last_login": null,<br />
    "is_superuser": false,<br />
    "email": "email@gmail.com",<br />
    "username": "username",<br />
    "first_name": "",<br />
    "last_name": "",<br />
    "groups": [],<br />
    "user_permissions": [],<br />
    "favorite_exercice": []<br />
}


### Declination

API URL: http://0.0.0.0:3000/api_musculib/declination/


### Muscle
API URL: http://0.0.0.0:3000/api_musculib/muscle/