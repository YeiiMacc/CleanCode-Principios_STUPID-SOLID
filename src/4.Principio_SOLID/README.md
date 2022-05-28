# Principio S.O.L.I.D.

## SOLID:
Cada principio básicamente cuenta de 3 partes, una exposición, un ejercicio y cómo detectar violaciones al principio.
Algunos son bastante obvios y otros tienen un poco más de complejidad.
Se aclara que estos son principios y no son reglas, simplemente deberían evitarse en lo posible.
¿Qué pasa si violentamos estos principios?
La respuesta es sencilla puede que tu programa no falle, pero comprenderlo y mantenerlo sería caótico.

### Acrónimo SOLID
Los 5 principios S.O.L.I.D. de diseño de software son:
*	S – Single Responsibility Principle (SRP)
*	O – Open/Closed Principle (OCP)
*	L – Liskov Substitution Principle (LSP)
*	I – Interface Segregation Principle (ISP)
*	D – Dependency Inversion Principle (DIP)

Estos principios buscan solucionar los Code Smells de una forma que no solo el código funcione como debería sino dándole una calidad esperada.
Estos principios nos indican como deberían ser las estructuras de nuestros métodos, clases, componentes y demás.

#### Single Responsibility Principle (SRP)
	
“Nunca debería haber más de un motivo por el cual cambiar una clase o un módulo” -Robert C. Martin

Una clase debe tener una única responsabilidad tener más de una responsabilidad hace que nuestro código sea más difícil de leer, mantener, testear y mantener. Es decir hace que el código sea mas rígido y en definitiva menos tolerante al cambio.
Pero tampoco queremos aclara que una única responsabilidad no es sinónimo de hacer una única cosa, queremos que las clases y módulos hagan una serie de tareas que estén estrechamente relacionados entre si.
El principio de responsabilidad única no se basa en crear clases con un solo método, sino en diseñar componentes que solo estén expuestos a una fuente de cambio.
Ejemplo:

```
(() => {

    interface Product { 
        id:   number;
        name: string;
    }
    
    // Usualmente, esto es una clase para controlar la vista que es desplegada al usuario
    // Recuerden que podemos tener muchas vistas que realicen este mismo trabajo.
    class ProductBloc {
    
        loadProduct( id: number ) {
            // Realiza un proceso para obtener el producto y retornarlo
            console.log('Producto: ',{ id, name: 'OLED Tv' });
        }
    
        saveProduct( product: Product ) {
            // Realiza una petición para salvar en base de datos 
            console.log('Guardando en base de datos', product );
        }
    
        notifyClients() {
            console.log('Enviando correo a los clientes');
        }
    
        onAddToCart( productId: number ) {
            // Agregar al carrito de compras
            console.log('Agregando al carrito ', productId );
        }
    
    }
    


    const productBloc = new ProductBloc();

    productBloc.loadProduct(10);
    productBloc.saveProduct({ id: 10, name: 'OLED TV' });
    productBloc.notifyClients();
    productBloc.onAddToCart(10);

})();
```


