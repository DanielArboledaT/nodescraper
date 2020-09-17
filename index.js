const express = require('express');
const app = express();
const path = require('path');
const cheerio = require('cheerio');
const request = require('request-promise');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.use(require('./routes/main'));

app.listen(app.get('port'), () => {
    console.log('servidor escuchando en el puerto ', app.get('port'));
});

module.exports = app;