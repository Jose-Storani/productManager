
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

-En la página principal mostrando todos los productos, se puede agregar a su carrito personal, y no perderá esa información si se deslogea. (actualmente al 31-3, existe un error al ingresar al render de "cart" donde se muestran todos los productos agregados al carrito. Los muestra y la aplicacion funciona, pero en la consola del back aparece error relacionado al model).

-Falta agregar boton de eliminar producto del carrito, la funcionalidad existe en el back, pero no en el front.

