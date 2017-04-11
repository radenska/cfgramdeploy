'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(`${__dirname}/build`));
app.listen(PORT, () => 'server up:', PORT);
//this server is necessary for deploy
