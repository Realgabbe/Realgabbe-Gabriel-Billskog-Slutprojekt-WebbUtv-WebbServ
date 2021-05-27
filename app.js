//Inkludera Express.js
const express = require('express')
//Inkludera dbModule.js
const dbModule = require('./dBModule')
//Inkludera MessageModel för att kunna spara meddelanden i databasen 
const MessageModel = require('./MessageModel')
//Gör en instans klassen express
const app = express()
//Ange porten som servern kommer att lyssna på.
const port = 3000

//Sökväg till sökväg till en mapp för alla statiska sidor och sätt den som default sökväg.
const staticDir = __dirname + '\\client\\'
app.use(express.static(staticDir))

//Sätt upp servern så att den kan tyda json och urlencoded
app.use(express.json())
app.use(express.urlencoded())

//Ställ in EJS som vymotor för servern. 
app.set('view engine' , 'ejs')

//Lyssnar på GET requests på addressen <domain>/
app.get('/', (req, res) => {
    //rendera sidan index.ejs
  res.render('index.ejs')
})

app.get('/mina_hundar', (req, res) => {
  res.render('mina_hundar.ejs')
})

app.get('/om_mig', (req, res) => {
res.render('om_mig.ejs')
})

app.get('/hundar_jag_minns', (req, res) => {
res.render('hundar_jag_minns')
})

app.get("/messages", async (req, res) => {
  const messages = await MessageModel.getAllMessages();
  res.render('kontakt.ejs', { messages: messages });
})

app.get('/kontakt', (req, res) => {
res.render('kontakt.ejs', { messages: [] })
})

app.get('/leiya', (req, res) => {
res.render('leiya.ejs')
})

//Lyssnar på POST requests på addressen <domain>/
app.post('/', async (req, res) => {
    //Skapa ett Message objekt
    const message = MessageModel.createMessage(req.body.email, req.body.message)

    //spara elementet Message i databasen
    await dbModule.storeElement(message)

    //Omdirigera klienten till huvudsidan
    res.redirect('/messages')
})

//Sätt igång servern så att den kan ta emot requests på vald port.
app.listen(port, () => console.log(`Example app listening on port ${port}!`))