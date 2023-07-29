
# Backend E-commerce

Proyecto realizado durante el curso de Backend de Coderhouse.




## Autor

- [@Jose Storani](https://github.com/Jose-Storani)

## Deploy

- No Available(free trial ended)
  
## Installation

Clonar el repositorio de manera local 

```bash
  git clone https://github.com/Jose-Storani/productManager.git
  
```
    

Npm para instalar las dependecias utilizadas

```bash
  npm i
  
```


    
## Deployment

Para correrlo de manera local usar: (puerto 8080)

```bash
  npm start
```


## Dependencias

- Express
- Mongoose
- Passport
- Swagger
- Winston
- Nodemailer
- Handlebars
- Express - Session
- Dotenv
- Cookie - Parser
- Paginate
- Express- Router
- Bcrypt

## Documentación
/api/docs

## Sobre la página

- Login necesario para poder acceder al contenido de la página.

- Si el usuario tiene el rol de admin, tambien podra acceder a features como "agregar productos" y "administrar usuarios" a su vez modificar productos.

- Durante el logeo, se verifica la identidad del usuario y sus credenciales, si todo está correcto, pasa a otro middleware para verificar si ese usuario tiene un carrito asignado a su cuenta, de no tenerlo, se le asigna uno.

- En la página principal mostrando todos los productos, se puede agregar a su carrito personal, y no perderá esa información si se deslogea.

- Al realizar la compra, se le envia ticket con información de la compra al mail del usuario.





