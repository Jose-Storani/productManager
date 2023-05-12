
# Backend E-commerce

Proyecto realizado durante el curso de Backend de Coderhouse.




## Autor

- [@Jose Storani](https://github.com/Jose-Storani)


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


## Instrucciones

-Login necesario para poder acceder al contenido de la página.

-Registro puede ser de manera manual o con github

-Si el usuario tiene el rol de admin, tambien podra acceder a features como "agregar productos".

-Durante el logeo, se verifica la identidad del usuario y sus credenciales, si todo está correcto, pasa a otro middleware para verificar si ese usuario tiene un carrito asignado a su cuenta, de no tenerlo, se le asigna uno.

-En la página principal mostrando todos los productos, se puede agregar a su carrito personal, y no perderá esa información si se deslogea.

-Falta agregar boton de eliminar producto del carrito, la funcionalidad existe en el back, pero no en el front.


## Testing Mocks
Hacer llamado al endpoint "/usersTest" con el metodo Post, generará un usuario random y se registrará en la BD.



## Endpoints

#CartRelated:
api/carts:

GET

 / 
No recibe parámetros, devuelve todos los carritos

/:cid 
Recibe por params el cartId, devuelve el carrito buscado, o una respuesta de "No se encontró el carrito" en caso de no existir


POST

/
No recibe parametros, chequea la existencia del carrito asociado al usuario que hizo login, si no existe, se le asigna uno, caso contrario, lo crea. Luego, guarda el id del carrito en sessions y lo devuelve. En este proyecto, está siendo llamado cuando carga la vista "products".


/:cid/product/:pid
Recibo dos párametros por params, el CartId y el ProductId.
Si el producto existe en el carrito, agrega 1 unidad.
Si no existe en el carrito, agrega el producto y le asigna 1 unidad.
Si el carrito está vacio, agrega el producto y le asigna 1.
(Nota al 27-4: modificar para que agregue una cantidad especifica enviada por body)


PUT

/:cid

Recibe por body un array de productos y por params, el Id del carrito a actualizar con ese array. Dicho array debe ser de objetos que contengan la propiedad productId, que será el Id del producto alojado en la BD y quantity, un Number.


/:cid/products/:pid

Recibe por params CartId y ProductId, y por body, quantity que será la cantidad de unidades a modificar del producto en el carrito determinado. Devuelve el carrito con el producto actualizado.


DELETE

/
Borra todos los carritos de la BD

/:cid

Borra unicamente el carrito buscado por el Id pasado por params.

/:cid/product/:pid

Borra del carrito pasado por params (id), el producto cuyo id también es pasado por params.
