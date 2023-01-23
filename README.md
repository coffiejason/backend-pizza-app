
# PIZZA APP

A demo app built with React,CSS and Nestjs


## Run Locally 
### FRONTEND


Clone the project

```bash
  git clone https://github.com/coffiejason/pizza-app
```

Go to the project directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install 
```

Start the server

```bash
  npm run dev
```


### BACKEND


Clone the project

```bash
  git clone https://github.com/coffiejason/pizza-app
```

Go to the project directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install 
```

Create a .env file in th root of the backend folder which would contain your mongodb url.

In your .env file assign your mongodb url to DATABASE_URL

```bash
  DATABASE_URL=your.mongodb.url

```

Start the server. 

```bash
  npm run start
```

Note. server runs on port:3600

Endoints
 POST: http://localhost:3600/orders - sumbit an order (single or multiple) <br />
 GET: http://localhost:3600/orders - Get all orders <br />
 GET: http://localhost:3600/orders/:id = Get data on an order where "id" is the order number (Including cook data) <br />
 GET: http://localhost:3600/orders/:id/report = Get cook data on an order where "id" is the order number. 
