const express = require('express');
const app = express();
const path = require('path');
const port = 80;
const bodyparse = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactGym', { useNewUrlParser: true });
const layouts = require('express-ejs-layouts')

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String
});
const Contact = mongoose.model('Contact', contactSchema);

app.use(layouts)
app.use('/static', express.static('static'))
app.use(express.urlencoded())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {

  res.render('home.ejs');
})
app.get('/about', (req, res) => {
  res.render('about.ejs');
})
app.get('/services', (req, res) => {
  res.render('services.ejs');
})
app.get('/contact', (req, res) => {
  res.render('contact.ejs');
})
app.get('/signin', (req, res) => {

  res.render('signin.ejs');
})
app.post('/contact', (req, res) => {
  var myData = new Contact(req.body);
  myData.save().then(() => {
    res.render("contact.ejs")
  }).catch(() => {
    res.send("item was not saved to the databse")
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});