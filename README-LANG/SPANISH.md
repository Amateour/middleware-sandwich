# middleware-sandwich
[![build](https://github.com/amateour/middleware-sandwich/actions/workflows/main.yml/badge.svg)](https://github.com/amateour/middleware-sandwich/actions/workflows/main.yml) [![npm version](https://badge.fury.io/js/@amateour%2Fmiddleware-sandwich.svg)](https://badge.fury.io/js/@amateour%2Fmiddleware-sandwich) [![Coverage Status](https://coveralls.io/repos/github/amateour/middleware-sandwich/badge.svg?branch=main)](https://coveralls.io/github/amateour/middleware-sandwich?branch=main)

Middleware de conexión integrado, permite mejorar la trazabilidad de los datos (argumentos y parámetros) transmitidos por solicitud HTTP.

#
## Características
---

- Validar los datos transmitidos por la solicitud http
- Analizar los datos validados
- Middleware integrado
- Rutas dinamicas

## Instalación

requires [Node.js](https://nodejs.org/) v12+.

```sh
npm i @amateour/middleware-sandwich --save
```

## Uso

### Función Sandwich.resource
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
        const { args } = this.parser_schemes(); // validación de argumentos y parámetros
        
        const password = args.password.valueOf(); // recuperar contraseña
        // código de validación ...
        const email = args.email.valueOf(); // recuperar correo electrónico
        
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
        const { args } = this.parser_schemes(); // validación de argumentos y parámetros
        
        const password = args.password.valueOf(); // recuperar contraseña
        // código de validación ...
        const email = args.email.valueOf(); // recuperar correo electrónico
        
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
### Parser y Shcemes

#### Shcemes: 
Un esquema representa un elemento de validación por ejemplo:
```
    {type: Sandwich.String, required: true, strict: true}
```
dicho esquema contine propiedades, cada una con su objetivo de validación.

##### Propiedades de un esquema: 
#
propiedad | descripción
------------ | -------------
type | tipo de dato,
required | (booleano) true requerido, false no requerido
min | (number) determina el valor minimo, si es un string validará la cantidad de caracteres, en el caso de un número valida su valor.
max | (number) determina el valor maxímo, igual que la propiedad min pero apuntando a un maxímo valor.
value | asignar un valor, tiene que ser igual tipo declarado, puede ser una función con una devolución value: () => uuid(); or value: 'developer'
validation | (function) validación de dato perzonalizada
strict | (booleano) determina la validación del tipo de dato de manera stricta si es true, por ejemplo si el tipo es string, y el valor es un número, no pasara la validación, pero si es falso aceptará el tipo de dato como string si cabe dentro de new String, de lo contrario arrojara un error de tipo de dato no valido

#### Parser:
la función this.parser_schemes() es ejecutada para analizar el patron de cada esquema según el valor de su elemento de analisis, observar ejemplos [Class Resource](/amateour/middleware-sandwich/blob/1.0.0-alpha/README-LANG/SPANISH.md) and [Function Sandwich.resource](/amateour/middleware-sandwich/blob/1.0.0-alpha/README-LANG/SPANISH.md#function-sandwich.resource)

#### Tipos de datos:
Sandwich.String
Sandwich.Number
Sandwich.Array
Sandwich.Boolean
Sandwich.Object

es posible utilizar los objetos String, Number, Array, Boolean, Object, directamente

### Función handler
```javascript
Sandwich.handler
```
La función handler prepara nuesta clase para ser utilizada por el servicio de enrutamiento que usemos, actualmente solo validamos el soporte para:

- Nexjs 
- express

pero serviría en cualquier tecnologias que funcione igual. 

La función handler espera dos parametros, el primero es una clase, el segundo es el nombre la función que sera el middleware final de la petición
```javascript
Sandwich.handler(Users, 'handlerUser') // el segundo aprametro es opcional
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
al no declarar el segundo parametro, se da por entender que la función middleware final sera el igual al metodo de la petición: 

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
Función que se ejecuta antes de la entrada a la función del metodo, existen varias formas de pasar middleware:

**`forma 1`**: (Matrix) De esta manera queda concatenada para todos los metodos, con la opción de agregar uno o mas middleware

````javascript
Sandwich.handler(User, [isAuthenticated, ...])
````

**`forma 2`**: (Matrix de objectos) se pueden asignar metodos especificos, por objeto declarado
````javascript
Sandwich.handler(User, [
    {
        methods: ['GET', 'PUT'],
        middleware: [isAuthenticated, ...]
    }
])
````

**`forma 3`**: (Objecto)
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
Router permite crear un flujo dinamico de rutas a travez de la función resources, inicialmente incorporando Router.app(app), app corresponde a la herramienta para crear los puntos finales (URIs) de una aplicación (endpoints), en este caso express().

````javascript
const app = express();
const router = Router.app(app);
````
#### Resources
##### router.resources
Recibe dos parametros, el primero es una matrix de string, que hace referencia al el camino (la url), el segundo parametro es la función Sandwich.hanlder, obviamente pasando como parametro la clase con sus funciones referenciadas (Sandwich.hanlder(Users)).

###### Path resources
#
````javascript
router.resources([
'/user',
'/user/:id',
['/user/:id_user/books/:id_book', 'user-book']
], Sandwich.hanlder(Users));
````

Los path (o url), cada uno tiene un comulo de funciones en representación del metodo solicitado.

````sh
'/user'
````
Metodo | función
------------ | -------------
Get | get
Post | post

````sh
'/user/:id' or '/user/:id_user/books/:id_book'
````

Metodo | función
------------ | -------------
GET | one
POST | stag
DELETE | delete
PUT | put
PATCH | patch

###### Nombar endpoints
En el caso de agregar dos path con argumentos por url, es necesario darle un nombre para identificar la entrada, ya que compartirían las mismas funciones, ejemplo:

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
La clase Sandwiches recibe dos parametros, el primero es un dato booleano, si se le pasa true la salida de validación de ese esquema esta representado por la instancia del tipo, observar el ejemplo 1 y 2.

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

## Contribuir
### [Guia del contribuidor](https://github.com/amateour/middleware-sandwich/blob/main/CODE_OF_CONDUCT.md)

## Personas
### Persona encargada [Brayan Salgado](https://github.com/Binariado)
### [Lista de contribuidores]()

## License

GPL 3.0

**Free Software**

[//]: # (Referencias utilizadas para construir este documento)

   [stackoverflow]: <http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax>
   [github]: <https://guides.github.com/features/mastering-markdown/#intro>
   [anvilproject]: <https://anvilproject.org/guides/content/creating-links>
