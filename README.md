# NodeJsMusicApi
Training project with nodeJs API

## To start

 - Installation : `npm install`
 - Mongo database : `mongodb`
 - Server MusicApi : `nodemon index` or `npm start` or `node index`
 
## Home

 - Link to home page: [http://localhost:8080/](http://localhost:8080/)
 - Link to API home page: [http://localhost:8080/api/v1/](http://localhost:8080/api/v1/)
 
Starting web PORT value can be change with an environment variable (8080 by default).

## API endpoints

| HTTP REQUESTS        | URL                                  | Status |
| ---                  | ---                                  | :---:  |
| **Artist** |
| GET/POST             | /artists/:artist_id/albums           | OK     |
| GET/PUT/PATCH/DELETE | /artists/:artist_id/albums/:album_id | WIP    |
| GET                  | /artists/:artist_id/tracks           |        |
| GET                  | /artists/:artist_id/tracks/:track_id |        |
||
| **Album** |
| GET/POST             | /albums                              | OK     |
| GET                  | /albums/:album_id                    | OK     |
| GET/POST             | /albums/:album_id/tracks             |        |
| GET/PUT/PATCH/DELETE | /albums/:album_id/tracks/:track_id   |        |
||
| **Track** |
| GET/POST             | /tracks                              |        |
| GET/PUT/PATCH/DELETE | /tracks/:track_id                    |        |
| GET/POST             | /tracks/:track_id/artists            |        |
| GET/PUT/PATCH/DELETE | /tracks/:track_id/artists/:artist_id |        |

## Database schema

| Artist    | Album     | Track     |
| ---       | ---       | ---       |
| id        | id        | id        |
| name      | title     | title     |
| firstName | year      | Artists   |
| lastName  | cover     | Album     |
| createdAt | Artist    | createdAt |
| updatedAt | createdAt | updatedAt |
|           | updatedAt |           |