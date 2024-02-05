
# Skill Test Backend - PT Knitto

Welcome to my private repository for the skill test as a Backend Developer candidate at Knitto Textiles Indonesia.

##  About Me
I am Irfiyanda Abidin, a backend developer with experience in using NodeJS, ExpressJS, TypeScript, and MySQL. I am enthusiastic about joining the Knitto Textiles Indonesia team and contributing to the development of innovative backend systems.

## About the Project
This project is the result of the skill test provided by Knitto Textiles Indonesia. I have implemented a backend solution using the requested technologies, namely NodeJS, ExpressJS, TypeScript, and MySQL. 
## API Reference

#### Get all produk

```http
  GET /api/v1/produk
```

#### Get produk by id

```http
  GET /api/v1/produk/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of produk to fetch |

#### Create produk

```http
  POST /api/v1/produk
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. data id of produk |
| `stok`      | `number` | **Required**. data stok of produk |
| `price`      | `number` | **Required**. data price of produk |
| `description`      | `string` | **Required**. data description of produk |
| `category_id`      | `number` | **Required**. Category_Id of produk |

#### Update produk

```http
  PATCH /api/v1/produk/:id
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Id of produk to fetch |
| `stok`      | `number` | **Required**. data stok of produk to update |
| `price`      | `number` | **Required**. data price of produk to update |
| `description`      | `string` | **Required**. data description of produk to update |
| `category_id`      | `number` | **Required**. data category_Id of produk to update |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of produk to fetch |

#### Delete by id

```http
  DELETE /api/v1/produk/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of produk to delete |

#### Get data wilayah use eksternal API

```http
  GET /api/v1/wilayah
```

#### Upload file

```http
  POST /api/v1/file
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `file`      | `File` | **Required**. File to upload to the server |


| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auhtorization`      | `Bearer ${token}` | **Required**. Token jwt to access endpoint |

#### Generate JWT to test Middleware check JWT

```http
  POST /api/v1/generate-jwt
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`HOST_DB`

`USER_DB`

`PASSWORD_DB`

`DATABASE`

`JWT_SECRET`



## Installation

- clone project with github

```bash
 git clone https://github.com/Irfiyandaabidin/SkillTest-BackendDeveloperKnitto.git
```

- install all package with npm
```bash
 npm install
```

- Copy the .env.example file to .env and fill it with your own data

- start project with npm
```
 npm run start
```
## Answer For Question

01. `src/controllers/produk.ts`

02. `src/middlewares/checkJwt.ts`

03. `src/controllers/fetchWilayah.ts`

04. `src/middlewares/uploadFile.ts`

05. `src/models/produk.ts`

06. `src/models/produk.ts`

07. `src/controllers/produk.ts`

08. `src/routes/produk.ts`

09. `src/validation/index.ts`
## Authors

- [@irfiyandaabidin](https://github.com/Irfiyandaabidin)

