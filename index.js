const express = require('express');
const app = require('express')();

require('./graphql')(app);
app.listen(3000, ()=>{
    console.log('server on port 3000')
})