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
##### Codigo:

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

Lo primero que notamos es que existen métodos que no deberían ser propios de la clase ProductBloc, como onAddCart, este método de carrito de compras estaría mucho mejor en una clase propia del  Carrito de compras.

```
    class CartBloc {
        private itemsInCart: Object[] = [];
        
        addToCart( productId: number ) {
            // Agregar al carrito de compras
            console.log('Agregando al carrito ', productId );
        }
    }

```

Ahora vemos los métodos de cargar un producto(loadProduct) y guardar producto(saveProduct), estos métodos pueden ser usados para hacer la transacción de un servidor o una API, por ende a fututo un cambio implicaría volver a la clase y alterar toda la lógica, para solucionar esto se puede crear un servicio que haga esta transacciones y en la clase únicamente los llamamos y continuamos con la lógica, de esta forma cualquier cambio a futuro solo afectaría al servicio que implementamos.

```
    // Procesos directos al server o API
    class ProductService {
        getProduct( id: number ) {
            // Realiza un proceso para obtener el producto y retornarlo
            console.log('Producto: ',{ id, name: 'OLED Tv' });
        }
    
        saveProduct( product: Product ) {
            // Realiza una petición para salvar en base de datos 
            console.log('Guardando en base de datos', product );
        }
    }

```

Perfecto, ahora veremos el método para notificar al cliente (notifyClient), es evidente que no pertenece al método producto directamente, entonces veremos que la solución sería una clase especial para el con toda su lógica y es seguro que a futuro necesita más elementos en su clase.
```
    // Manejo de emails
    class Mailer {
       private masterEmail: string = 'yeiimaccdev@google.com';

       sendEmail(emailList: string[], template:  'to-client' | 'to-admin') {
            console.log('Enviando correo a los clientes', template );
        }
    }

```

Ahora que tenemos los ajustes quisiéramos centralizar los ajustes que realizamos en nuestra clase ProductBloc. Para ello vamos a inyectar las dependencias a través de un constructor.
```
    class ProductBloc {

        // Inyectar dependencias
        private productService: ProductService;
        private mailer: Mailer;

        constructor( productService: ProductService, mailer: Mailer ) {
            this.productService = productService;
            this.mailer = mailer;
        }

```

Ahora vamos a acceder a las dependencias y consumir los nuevos métodos que realizamos.
```
    class ProductBloc {

        // Inyectar dependencias
        private productService: ProductService;
        private mailer: Mailer;

        constructor( productService: ProductService, mailer: Mailer ) {
            this.productService = productService;
            this.mailer = mailer;
        }
    
        loadProduct( id: number ) {
            // consumir el metodo de ProductService
            this.productService.getProduct( id );
        }
    
        saveProduct( product: Product ) {
            // consumir el metodo de ProductService
            this.productService.saveProduct( product );
        }
    
        notifyClients() {
            // consumir el metodo de Mailer
            this.mailer.sendEmail(['testXClient@google.com'], 'to-client');
        }   
    }
```

Ahora vemos que en las instancias tenemos un error, y vamos a solucionarlo:
Aparte como ventaja tenemos una super facilidad al probar cada clase. Nuestras clases se encuentran centralizadas ahora.

```
    // Nuevas instancias
    const productService = new ProductService();
    const mailer = new Mailer();

    const productBloc = new ProductBloc( productService, mailer);
    const cartBloc = new CartBloc();

    productBloc.loadProduct(10);
    productBloc.saveProduct({ id: 10, name: 'OLED TV' });
    productBloc.notifyClients();
    cartBloc.addToCart(10);
```

Con eso terminamos con este ejemplo, ahora veremos el código completo.
```
(() => {

    interface Product { 
        id:   number;
        name: string;
    }

    // Procesos directos al server o API
    class ProductService {
        getProduct( id: number ) {
            // Realiza un proceso para obtener el producto y retornarlo
            console.log('Producto: ',{ id, name: 'OLED Tv' });
        }
    
        saveProduct( product: Product ) {
            // Realiza una petición para salvar en base de datos 
            console.log('Guardando en base de datos', product );
        }
    }

    // Manejo de emails
    class Mailer {
        private masterEmail: string = 'yeiimaccdev@google.com';

        sendEmail(emailList: string[], template:  'to-client' | 'to-admin') {
            console.log('Enviando correo a los clientes', template );
        }
    }

    
    // Usualmente, esto es una clase para controlar la vista que es desplegada al usuario
    // Recuerden que podemos tener muchas vistas que realicen este mismo trabajo.
    class ProductBloc {

        // Inyectar dependencias
        private productService: ProductService;
        private mailer: Mailer;

        constructor( productService: ProductService, mailer: Mailer ) {
            this.productService = productService;
            this.mailer = mailer;
        }
    
        loadProduct( id: number ) {
            // consumir el metodo de ProductService
            this.productService.getProduct( id );
        }
    
        saveProduct( product: Product ) {
            // consumir el metodo de ProductService
            this.productService.saveProduct( product );
        }
    
        notifyClients() {
            // consumir el metodo de Mailer
            this.mailer.sendEmail(['testXClient@google.com'], 'to-client');
        }   
    }

    class CartBloc {
        private itemsInCart: Object[] = [];

        addToCart( productId: number ) {
            // Agregar al carrito de compras
            console.log('Agregando al carrito ', productId );
        }
    }

    // Nuevas instancias
    const productService = new ProductService();
    const mailer = new Mailer();

    const productBloc = new ProductBloc( productService, mailer);
    const cartBloc = new CartBloc();

    productBloc.loadProduct(10);
    productBloc.saveProduct({ id: 10, name: 'OLED TV' });
    productBloc.notifyClients();
    cartBloc.addToCart(10);

})();
```


##### Detectar violaciones:
*	Nombres de clases o módulos demasiado genéricos.
Con un nombre muy genérico la clase termina extendiéndose y ocupándose de tareas más que las necesarias. Nombres como Repositorio o Servicio, que no sabemos ni de que se ocupan productos o clientes tal vez órdenes.

*	Cambios en el código suelen afectar la clase o módulo.
Escribir demasiado código para un ajuste en toda la clase afectando el proceso es un indicador que no tenemos la mejor implementación.
*	La clase involucra múltiples capas.
Cuando usa capa de almacenamiento, capa de comunicación con la base de datos, capa de la interfaz de usuario, es decir demasiada interacción desde una sola clase, lo que indica que la clase tiene demasiadas responsabilidades
*	Número elevado de importaciones.
Cuando al inicio del archivo se ven 5, 10 hasta 15 importaciones, aunque puede ser relativo y difícil de detectar. Cuando tenemos muchas importaciones puede que sean importantes para este modulo o archivo, pero si hablamos de clases o módulos abstractos que deben hacer una tarea especifica no debería haber tantas importaciones. Si las hay una vez mas quiere decir que esta clase o modulo esta haciendo demasiadas cosas que no debería.
*	Cantidad elevada de métodos públicos. (o elevados al mundo exterior).
Si tiene muchos métodos y funciones expuestos al mundo exterior significa que la clase esta haciendo mas de lo que debería. 
Pareciera que en cada consejo se repite lo mismo, y en realidad si, porque todos pertenecen al principio de responsabilidad única. Esta lo que busca es que cada clase o modulo haga una responsabilidad única, que haga pocas tareas pero que las haga bien.
*	Excesivo número de líneas de código.
No existe un numero exacto que si lo superas esta mal, no, es relativo, pero como desarrollador se puede notar, “Este método o clase está tomando demasiadas líneas de código, se está haciendo difícil de mantener” en ese momento se debe pensar que algo no anda bien y que tal vez se puede refactorizar.


