# news-explorer-api

## Description

Backend api for a social news site

## Api url

https://api.dean-news.students.nomoredomainssbs.ru

## Routes

### Open routes:

- POST /signup - Registration
  body should contain {name: string minimum 2 maximum 30, email: string, password: string}

- POST /signin - Login
  body should contain {email: string, password: string}

### Protected routes:

In order to access this part of the api, users should be authorized via JWT token passed in the request headers
as - 'Authorization': 'Bearer {JWT Token}'

- GET /users/me - User profile
  No body for this request

- GET /articles - User-saved articles
  no body for this request

- POST /articles - Save user's article
  body should contain {keyword: string, title: string, text: string, date: string, source: string, link: string - Must be URL, image: string - Must be URL}

- DELETE /articles/:articleId
  articleId param must be an objectId of an exisiting article
