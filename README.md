[![Build Status](https://travis-ci.org/LeGoffMael/NodeJsMusicApi.svg?branch=master)](https://travis-ci.org/LeGoffMael/NodeJsMusicApi)

# NodeJsMusicApi
NodeJs Music API is a training project using Babel, Chai, Express, MongoDB & Mocha.

## TODO

 - Display `self` and `related` virtual attributes
 - Improve unit tests of albums part (delete an artist should delete his albums, test endpoints from artist, ...)
 - Implement query strings (limit, offset, sort, ...)

## To start

 - Dependencies installation : `npm install`
 - Launch unit tests : `npm test`
 - App MusicApi : `npm start`

## Home

 - Link to home page: `/`
 - Link to API home page: `/api/v1/`
 
Starting web PORT value can be change with an environment variable (8080 by default).

## API endpoints

| HTTP REQUESTS        | URL                                  | Status |
| ---                  | ---                                  | :---:  |
| **Artist** |
| GET/POST             | /artists                             | OK     |
| GET/PUT/PATCH/DELETE | /artists/:artist_id                  | OK     |
| GET/POST             | /artists/:artist_id/albums           | OK     |
| GET/PUT/PATCH/DELETE | /artists/:artist_id/albums/:album_id | OK     |
||
| **Album** |
| GET/POST             | /albums                              | OK     |
| GET                  | /albums/:album_id                    | OK     |

## Database schema

| Artist    | Album     |
| ---       | ---       |
| id        | id        |
| name      | title     |
| firstName | year      |
| lastName  | cover     |
| createdAt | Artist    |
| updatedAt | createdAt |
|           | updatedAt |