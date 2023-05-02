yarn add express

nodemon index.js  -> reload auto if we change anything (api works)

yarn add mongoose -> package connecting to our db

yard add dotenv

yarn add bcryptjs -> encrypt pw (not send in plain text to db)




# CORS error

app on port 5173 can not communicate with ou app on post 4000 (api)

-> need to add the CORS specification(cors headers)  OR   "yarn add cord"

# req.body undefined > we need to parse the json from req
app.use(express.json());  -> app should use json parser