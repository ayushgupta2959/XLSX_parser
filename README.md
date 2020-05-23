# XLSX Parser

This is a nodejs application which parses .xlsx and .csv files. It generates dynamic schemas based on its content and add the rows to mongoDB.

## Requirements

Latest version of Nodejs and npm package

## Usage

1. Clone the repo
2. Use following command to install required dependencies

```bash
  npm install
```

3. Change directory to the repo

```bash
cd 'XLSX Parser'
```

4. create .env file and add variable DATABASE_URI. Example:
   use locally hosted mongodb server

```
mongodb://localhost:1234/myproject
```

or, use mongodb atlas

```
mongodb+srv://username:the_password@something_here/dbname
```

5. start the server using

```
npm run dev
```

6. access app on localhost:2959/
   | route | METHOD | functionality |
   |--------------|--------|-------------------------------------------------------------------------------------------------------|
   | / | GET | returns a form to upload a file |
   | /collections | GET | returns all collection names in the database. |
   | /collections | POST | accepts a file with key as "file". returns success of failure response. |
   | /collections | DELETE | accepts collection name and deleted the collection from database. returns success or failure response |

## License

MIT

```

```

```

```
