# NodeJsMusicApi
NodeJs Music API training project using Babel, Chai, Express, MongoDB & Mocha.

## To start

 - Installation : `npm install`
 - Mongo database : `mongodb`
 - Test : `npm test`
 - App MusicApi : `npm start`
 
## Home

 - Link to home page: [http://localhost:8080/](http://localhost:8080/)
 - Link to API home page: [http://localhost:8080/api/v1/](http://localhost:8080/api/v1/)
 
Starting web PORT value can be change with an environment variable (8080 by default).

## TODO

 - Change cover attribute in album model to picture
 - Set albums endpoints from artists (/artists/:artist_id/albums/...)
 - Setting test of albums part (add to an album, delete an artist delete his albums, ...)

## API endpoints

| HTTP REQUESTS        | URL                                  | Status |
| ---                  | ---                                  | :---:  |
| **Artist** |
| GET/POST             | /artists                             | OK     |
| GET/PUT/PATCH/DELETE | /artists/:artist_id                  | OK     |
| GET                  | /artists/:artist_id/albums           | OK     |
| POST                 | /artists/:artist_id/albums           | TODO   |
| GET/PUT/PATCH/DELETE | /artists/:artist_id/albums/:album_id | TODO   |
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