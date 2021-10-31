##### [Spanish](https://github.com/amateour/middleware-sandwich/blob/1.0.0-alpha/README-LANG/SPANISH.md)
# middleware-sandwich
[![build](https://github.com/amateour/middleware-sandwich/actions/workflows/main.yml/badge.svg)](https://github.com/amateour/middleware-sandwich/actions/workflows/main.yml) [![npm version](https://badge.fury.io/js/@amateour%2Fmiddleware-sandwich.svg)](https://badge.fury.io/js/@amateour%2Fmiddleware-sandwich) [![Coverage Status](https://coveralls.io/repos/github/amateour/middleware-sandwich/badge.svg?branch=main)](https://coveralls.io/github/amateour/middleware-sandwich?branch=main)

Integrated connection middleware, allows to improve the traceability of the data (arguments and parameters) transmitted by HTTP request.

#
## Features
---

- Validate the data transmitted by the http request
- Analyze the validated data
- Integrated middleware
- Dynamic routes

## Instalation

requires [Node.js](https://nodejs.org/) v12+.

```sh
npm i @amateour/middleware-sandwich --save
```

## Usage

### Function Sandwich.resource
#
```javascript
import { Sandwich } from '@amateour/middleware-sandwich';
```

```javascript
class Users extends Sandwich.resource({
    email: {type: Sandwich.String, required: true, strict: true},
    password: {type: Sandwich.String, required: true, strict: true, min: 8}
}){
    // Method POST
    async post() {
        const { args } = this.parser_schemes(); // argument and parameter validation
        
        const password = args.password.valueOf(); // recover password
        // validation code ...
        const email = args.email.valueOf(); // recover email
        
        return [{
            message: 'data_user',
            data: {
                name: 'Orlando Medina'
                email: email
            }
        }, 200];
    }
}
```
### Class Resource
#
```javascript
import { Resource } from '@amateour/middleware-sandwich';
```

```javascript
class Users extends Resource {
    email = this.parser({type: Sandwich.String, required: true, strict: true}),
    password = this.parser({type: Sandwich.String, required: true, strict: true, min: 8})
    
    // Method POST
    async post() {
        const { args } = this.parser_schemes(); // argument and parameter validation
        
        const password = args.password.valueOf(); // recover password
        // validation code ...
        const email = args.email.valueOf(); // recover email
        
        return [{
            message: 'data_user',
            data: {
                name: 'Orlando Medina'
                email: email
            }
        }, 200];
    }
}
```
### Parser and Shcemes

#### Shcemes: 
A schema represents a validation element, for example:
```
    {type: Sandwich.String, required: true, strict: true}
```
dicho esquema contine propiedades, cada una con su objetivo de validación.

##### Properties of a schema: 
#
property | description
------------ | -------------
type | type of data,
required | (boolean) true required, false not required
min | (number) determines the minimum value, if it is a string it will validate the number of characters, in the case of a number it will validate its value.
max | (number) determines the maximum value, the same as the min property but pointing to a maximum value.
value | assign a value, it has to be of the same declared type, it can be a function with a return value: () => uuid (); or value: 'developer'
validation | (function) custom data validation
strict | (Boolean) determines the validation of the data type strictly if it is true, for example if the type is string and the value is a number, it will not pass the validation, but if it is false it will accept the data type as string if possible within the new chain; otherwise it will throw invalid data type error

#### Parser:
the this.parser_schemes () function is executed to parse the pattern of each schema according to the value of its parser element, see examples [Class Resource](/amateour/middleware-sandwich/tree/1.0.0-alpha#class-resource) and [Function Sandwich.resource](/amateour/middleware-sandwich/tree/1.0.0-alpha#function-sandwich.resource)

#### Type of data:
Sandwich.String
Sandwich.Number
Sandwich.Array
Sandwich.Boolean
Sandwich.Object

it is possible to use the objects, String, Number, Array, Boolean, Object, directly

### Function handler
```javascript
Sandwich.handler
```
The handler function prepares our class to be used by the routing service we use, currently we only validate support for:

- Nexjs 
- express

but it would work on any technology that works the same. 

The controller function expects two parameters, the first is a class, the second is the name of the function that will be the final middleware of the request.
```javascript
Sandwich.handler(Users, 'handlerUser') // the second aprameter is optional
```
```javascript
import { Resource } from '@amateour/middleware-sandwich';
class Users extends Resource{
    handlerUser() { // Method GET | POST ...
       // code ... 
    }
}
export default Sandwich.handler(Users, 'handlerUser')
```
By not declaring the second parameter, it is implied that the final middleware function will be the same as the request method:

```javascript
import { Resource } from '@amateour/middleware-sandwich';
class Users extends Resource{
    get() { // Method GET
       // code ... 
    }
}
export default Sandwich.handler(Users)
```

##### `Nextjs`
#
```javascript
export default Sandwich.handler(Users);
```

##### `Express`
#
```javascript
import Users from '/resource/user';
import { Router, Sandwich } from '@amateour/middleware-sandwich';

const express = require('express');
const app = express();
const router = Router.app(app);
app.get('/user', Sandwich.hanlder(Users, 'hanlderUser'));

router.resources([
'/user',
'/user/:id',
], Sandwich.hanlder(Users));

app.use('/api', ruter);
```

##### Middleware
Function that is executed before the input to the method function, there are several ways to pass the middleware:

**`shape 1`**: (Array) In this way it is concatenated for all methods, with the option of adding one or more middleware

````javascript
Sandwich.handler(User, [isAuthenticated, ...])
````

**`shape 2`**: (Object array) specific methods can be assigned, per declared object
````javascript
Sandwich.handler(User, [
    {
        methods: ['GET', 'PUT'],
        middleware: [isAuthenticated, ...]
    }
])
````

**`shape 3`**: (Objecto)
````javascript
Sandwich.handler(User, {
        methods: ['GET', 'PUT'],
        middleware: [isAuthenticated, ...]
})
````

### Routers
````javascript
import { Router } from '@amateour/middleware-sandwich';
````
Router allows creating a dynamic flow of routes through the resource function, initially incorporating Router.app (app), app corresponds to the tool to create the endpoints (URIs) of an application (endpoints), in this case express().

````javascript
const app = express();
const router = Router.app(app);
````
#### Resources
##### router.resources
It receives two parameters, the first is a string matrix, which refers to the path (the url), the second parameter is the Sandwich.hanlder function, obviously passing the class with its referenced functions as a parameter (Sandwich.hanlder(Users)).

###### Path resources
#
````javascript
router.resources([
'/user',
'/user/:id',
['/user/:id_user/books/:id_book', 'user-book']
], Sandwich.hanlder(Users));
````

The path (or url), each one has a set of functions representing the requested method.

````sh
'/user'
````
Method | function
------------ | -------------
Get | get
Post | post

````sh
'/user/:id' or '/user/:id_user/books/:id_book'
````

Method | function
------------ | -------------
GET | one
POST | stag
DELETE | delete
PUT | put
PATCH | patch

###### Nombar endpoints
In the case of adding two paths with arguments per url, it is necessary to give it a name to identify the entry, since they would share the same functions, example:

````sh
'/user/:id'
'/user/:id_user/books/:id_book'
````

````sh
['path', 'name path']
['/user/:id_user/books/:id_book', 'user-book']
````

````javascript
get(path_name) {
    if(path_name = 'user-book') {
        // code para /user/:id_user/books/:id_book
    } else {
        // code para /user/:id_user
    }
}
````

## Extras
### Validador de datos
The Sandwiches class receives two parameters, the first is a Boolean data, if it is passed true, the validation output of that schema is represented by the instance of the type, see example 1 and 2.

````Javascript
import {Sandwiches} from '@amateour/middleware-sandwich';

const UserScheme = {
  email: {type: Sandwich.String, required: true, strict: true},
  password: {type: Sandwich.String, required: true, strict: true, min: 8}
}
const valueOf = true;

const Snak = new Sandwiches(valueOf, UserScheme);

try {
    // la devolución es una promesa
    const { args } = await Snak.parser_schemes({
      email: "test@sandwich.com",
      password: "123",
    });

    args.email.valueOf() // = test@sandwich.com
    args.email instanceof String // = true
    
} catch (error) {
    console.error(error)
}
````
**`ejamplo 1`:**
````javascript
    // valueOf = true
    args.email.valueOf() // = test@sandwich.com
    args.email instanceof String // = true
````

**`ejamplo 2`:**
````javascript
    // valueOf = false
    args.email // = test@sandwich.com
    args.email instanceof String // = false
````

## Contribute
### [Contributor guide](https://github.com/amateour/middleware-sandwich/blob/main/CODE_OF_CONDUCT.md)

## Persons
### Person in charge [Brayan Salgado](https://github.com/Binariado)
### [List of contributors]()

## License

GPL 3.0

**Free Software**

[//]: # (References used to build this document)

   [stackoverflow]: <http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax>
   [github]: <https://guides.github.com/features/mastering-markdown/#intro>
   [anvilproject]: <https://anvilproject.org/guides/content/creating-links>
