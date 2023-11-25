#### Instructions on how to run the application locally.

Clone the project.

```bash
    git clone https://github.com/waliullah9099/level-2-Assign-2.git
```

Go to project directory

```bash
    cd the project
```

Install require dependance

```bash
    npm install
```

Run server

```bash
npm run start:dev

```

##### Then check how to work this project go to Postman

###### User Related Api

Create a user

```bash
 http://localhost:5000/api/users
```

Get all user

```bash
 http://localhost:5000/api/users

```

Get Single user

```bash
 http://localhost:5000/api/users/:userId

```

Update Single user

```bash
 http://localhost:5000/api/users/:userId

```

Delete Single user

```bash
 http://localhost:5000/api/users/:userId

```

###### Orders Related Api

Create order poperty of a Single user collection

```bash
 http://localhost:5000/api/users/:userId/orders

```

Get orders of a Single user

```bash
 http://localhost:5000/api/users/:userId/orders

```

Calculate Total Price of Orders for a Specific User

```bash
 http://localhost:5000/api/users/:userId/orders/total-price

```
