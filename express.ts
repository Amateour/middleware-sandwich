#!/usr/bin/env node
import Sandwich, {Resource, ParserSchemes, Validators, Type} from './src';
import tomato from './src/lib/tomatos';

import bodyParser from 'body-parser';
import debuggers from 'debug';
import http from 'http';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const express = require('express');

class UsersSchemesValidator extends ParserSchemes {
    constructor(){
        super(false)
    }

    email = {type: Type.String, required: true, strict: true};
    password = {type: Type.String, required: true, strict: true, min: 8};
    confirmPassword = {type: Type.String, required: true, strict: true, min: 8};
}

class Users extends Resource {

    static parsers = new UsersSchemesValidator();

    static validator = new Validators({
        email: {type: Type.String, required: true, strict: true},
        password: {type: Type.String, required: true, strict: true, min: 8},
        confirmPassword: {type: Type.String, required: true, strict: true, min: 8}
    })

    async get(req: any, res: any) {
        try {

            const data: any = await Users.parsers.parserSchemes();
            const mix = tomato(1234)
            const to = tomato.map(data.args, ((v: any) => v))

            res.status(200).json({
                params: req.params,
                query: req.query,
                body: {
                    to,
                    mix
                }
            });
        } catch (e: any) {
            res.status(e.statusCode ?? 500).json({
                message: e.message ?? 'internal_server',
                errors: e.errors,
                stack: e.stack,
            });
        }
    }

    async post(req: any, res: any) {
        try {
            const data = await Users.validator.parserSchemes({
                ...req.query,
                ...req.params,
                ...req.body
            });

            res.status(200).json({
                params: req.params,
                query: req.query,
                body: data.args
            });
        } catch (e: any) {
            res.status(e.statusCode ?? 500).json({
                message: e.message ?? 'internal_server',
                errors: e.errors
            });
        }
    }

}


/**
 * Module dependencies.
 */
const debug = debuggers('sandwich:server');
const app = express();
const router = Sandwich.routers(express());
const userRouter = express();

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

userRouter.all('/users', Sandwich.handler(Users));

router.resource( {
    methods:[],
    middleware:[]
}, '/client', Users);

app.use('/', userRouter);
//app.use('/api', router.app);

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function () {
    console.log(`Example app listening at http://localhost:${port}`)
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: any) {
    const port: number = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind: string = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const add_r: any = server.address();
    const bind = typeof add_r === 'string'
        ? `pipe ${add_r}`
        : `port ${add_r.port}`;
    debug('Listening on ' + bind);
}
