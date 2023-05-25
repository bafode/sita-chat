const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const http = require('http')
const container = require('./container')
const users = require('./controllers/users')

container.resolve(function(){
    
    const app = SetupExpress()

    function SetupExpress() {
        const app = express();
        const server = http.createServer(app);
        server.listen(3000,function(){
            console.log('listening on port 3000')
        })

        ConfigureExpress(app);

        const router = require('express-promise-router')()
        users.setRouting(router)
        app.use(router)

    }

    
    function ConfigureExpress(app) {
        app.use(express.static('public'));
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}))
    }
})