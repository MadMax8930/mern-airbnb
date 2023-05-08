## M.E.R.N Booking application made with [`yarn create vite`]
Node version 16.7

### Dependencies:

- yarn add tailwindcss postcss autoprefixer
- yarn add react-router-dom
- yarn add axios

### Run server:

```bash
yarn dev
```

### Tailwind: 
[CSS Management](https://tailwindcss.com/docs) documentation
- npx tailwind init -p

### Deployment
[Project deployed](https://mymernbooking.vercel.app) on Vercel.

// Backend

- yarn add express

nodemon index.js  -> reload auto if we change anything (api works)

- yarn add mongoose (connection mongodb)
- yard add dotenv
- yarn add bcryptjs (encrypt password)

// Login user and create JSON Web Token, respond with a Cookie and encrypted username
yarn add jsonwebtoken -> cookie ('name', 'value') -> if pass is correct

- yarn add cookie-parser
- yarn add image-downloader
- yarn add multer


# CORS error

app on port 5173 can not communicate with ou app on post 4000 (api)

-> need to add the CORS specification(cors headers)  OR   "yarn add cord"

# req.body undefined > we need to parse the json from req
app.use(express.json());  -> app should use json parser