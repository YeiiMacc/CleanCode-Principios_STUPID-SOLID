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


#### Open/Closed Principle (OCP)
Principio abierto y cerrado.
Es un principio que depende mucho del contexto (framework, ambientes):
Establece que las entidades de software (clases, módulos, métodos, etc) deben estar abiertas para la extensión, pero cerradas para la modificación.
Tenemos un método el cual registra un archivo con el nombre de Hola.txt  y los nuevo requisitos sugieren que el nuevo nombre sea adios.txt, si el código no respeta este principio de abierto y cerrado, debemos ir al centro del método a cambiar el nombre manualmente.
 
Para solucionarlo y respetar el principio lo mejor sería que el método reciba la parámetro variable como un string y deje el método libre de ediciones futuras, el único ajuste seria enviar el nuevo nombre a través del argumento y de esa forma el método no será modificado. 
 
El principio abierto – cerrado también se puede lograr de muchas otras maneras, incluso mediante el uso de herencia o mediante patrones de diseño de composición como el patrón de estrategia.
Recordemos que en el Clean code se recomienda o procura usar la composición frente a la herencia.
##### Código:
**2.OpenCloseA**
```
import { PhotosService, PostService, TodoService } from './2.OpenCloseB';

(async () => {

    const todoService = new TodoService();
    const postService = new PostService();
    const photosService = new PhotosService();

    const todos = await todoService.getTodoItems();
    const posts = await postService.getPosts();
    const photos = await photosService.getPhotos();
    
    
    console.log({ todos, posts, photos });
    

})();
```

**2.OpenClseB**
Se debe instalar axios en la terminal con “npm install axios” o
```
// Hay que agregar la dependencia de axios ```yarn add axios```
import axios from 'axios';

export class TodoService { 

    async getTodoItems() {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/');
        return data;
    }
}

export class PostService {

    async getPosts() {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return data;
    }
}

export class PhotosService {

    async getPhotos() {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos');
        return data;
    }

}
```

Abierto a la edición, pero cerrado a la modificación.
Vemos este código anterior demasiado expuesto a la edición si la url de consulta llegara a cambiar, aparte que es totalmente dependiente de axios.
Si en un futuro la url es diferente tendremos que volver método por método a editarla y colocar la nueva, esto violenta nuestro principio.
Si en un futuro axios deja de funcionar, funciona diferente o simplemente se quiere usar otra forma de realizar la consulta, entonces fallan todos los métodos, tendremos que venir a editarlos igualmente uno por uno, otra violación más al principio.
Solución:
Crearemos un nuevo archivo y vamos a descentralizar las operaciones de consulta.

**2.OpenCloseC**
```
import axios from 'axios';

export class HttpClient {

    async get (url: string ) {
        const { data, status } = await axios.get(url);
        return { data, status };
    }

}
```

De esta forma vamos a usar un solo método que realice la consulta ya sea con axios o la forma que se implemente, aparte estaremos recibiendo una url abierta a la edición.
Ahora la vamos a inyectar a travez de los constructores para implementar su uso.

**2.OpenCloseB**
```
    import { HttpClient } from "./2.OpenCloseC";

    export class TodoService { 
        constructor (private http: HttpClient) {}

        async getTodoItems() {
            const { data } = await this.http.get('https://jsonplaceholder.typicode.com/todos/');
            return data;
        }
    }

    export class PostService {
        constructor (private http: HttpClient) {}

        async getPosts() {
            const { data } = await this.http.get('https://jsonplaceholder.typicode.com/posts');
            return data;
        }
    }

    export class PhotosService {
        constructor (private http: HttpClient) {}

        async getPhotos() {
            const { data } = await this.http.get('https://jsonplaceholder.typicode.com/photos');
            return data;
        }

    }
```

Y por último modificaremos las instancias, ahora debemos pasarle la nueva dependencia para que puedan alimentar el constructor.

**2.OpenCloseA**
```
import { PhotosService, PostService, TodoService } from './2.OpenCloseB';
import { HttpClient } from './2.OpenCloseC';

(async () => {

    const httpClient = new HttpClient();

    const todoService = new TodoService(httpClient);
    const postService = new PostService(httpClient);
    const photosService = new PhotosService(httpClient);

    const todos = await todoService.getTodoItems();
    const posts = await postService.getPosts();
    const photos = await photosService.getPhotos();
    
    
    console.log({ todos, posts, photos });
})();

```

Perfecto de esta forma tenemos el código mucho mas independiente, con un método descentralizado que se encarga de manejar el método de consulta.
**Patrón adaptador:** Es el nombre del archivo que creamos *2.OpencCloseC*, el cual se encarga de adaptar o poner en uso ciertas dependencias de terceros con el proyecto. Se recomienda mucho su implementación para que sea mas sencillo hacer modificaciones a futuro, ya que como son manejadas por terceros sus cambios quedan fuera de nuestras manos y pueden afectar al proyecto, con el adaptador solo modificamos un lado y todo queda funcional una vez más.
Ahora veremos la ventaja de este principio y el principio de responsabilidad unica, vamos a cambiar la forma de consultar, dejaremos de usar axios y usaremos fetch solo con un par de líneas modificadas.
```
export class HttpClient {

    async get (url: string ) {
        const resp = await fetch(url);
        const data = await resp.json();
        return { data, status: resp.status };
    }

}
```
Como podemos ver gracias a su independencia sería el único cambio, el resto del código seguiría sin cambio alguno.

##### Detectar violaciones
*	Cambios normalmente afectan nuestra clase o modulo.
Cuando se tiene un nuevo requerimiento esto implica abrir la clase y modificar varias funciones o métodos.
*	Cuando una clase o modulo afecta muchas capas (Presentación, almacenamiento, etc. )
Usualmente esto significa que la clase tiene muchas responsabilidades, violentando principio de responsabilidad única y open and close.  En este caso se debe refactorizar, si debemos decidir entre unos microsegundos de velocidad o un código mejor entendible para desarrolladores, es mejor un código de calidad. Recordemos que todos estos principios son recomendaciones, no reglas.



#### Liskov Substitution Principle (LSP)
> “Las funciones que utilicen punteros o referencias a clases base deben ser capaces de usar objetos de clases derivadas sin saberlo” – Robert C. Martin

Creado por la Doctora Barbara Jane Huberman, mas conocida como Barbara Liskov, ganadora del premio de Turing Award.
Por contribuciones a los fundamentos prácticos y teóricos del lenguaje de programación y el diseño de sistemas, especialmente relacionados con la abstracción de datos, la tolerancia a fallas y la computación distribuida.

Que dice este principio:
*“Siendo U un subtipo de T, cualquier instancia de T deberia poder ser sustituida por cualquier instancia de U sin alterar las propiedades del sistema”*


##### Código:
Ahora un ejemplo practico donde vamos violentar el principio de Liskov y el principio Open and Close, de esta forma veremos ejemplos de la vida real y como solucionarlos.

**3.LiskovA**
Tenemos nuestro código principal donde evaluamos un arreglo de Autos y hacemos instancia del método de Numero De Puertas, por último, hacemos un arreglo de instancias directo a las clases.
```
import { Tesla, Audi, Toyota, Honda } from './3.LiskovB';

(() => {
    
    const printCarSeats = ( cars: (Tesla | Audi | Toyota | Honda)[] ) => {
        
        for (const car of cars) {
         
            if( car instanceof Tesla ) {
                console.log( 'Tesla', car.getNumberOfTeslaSeats() )
                continue;
            }
            if( car instanceof Audi ) {
                console.log( 'Audi', car.getNumberOfAudiSeats() )
                continue;
            }
            if( car instanceof Toyota ) {
                console.log( 'Toyota', car.getNumberOfToyotaSeats() )
                continue;
            }
            if( car instanceof Honda ) {
                console.log( 'Honda', car.getNumberOfHondaSeats() )
                continue;
            }         

        }
    }
    
    const cars = [
        new Tesla(7),
        new Audi(2),
        new Toyota(5),
        new Honda(5),
    ];

    printCarSeats( cars );

})();
```

**3.LiskovA**
Tenemos cada una de las clases de Autos, con sus respectivos constructores y métodos.

```
export class Tesla {

    constructor( private numberOfSeats: number ) {}

    getNumberOfTeslaSeats() {
        return this.numberOfSeats;
    }
}

export class Audi {

    constructor( private numberOfSeats: number ) {}

    getNumberOfAudiSeats() {
        return this.numberOfSeats;
    }
}

export class Toyota {

    constructor( private numberOfSeats: number ) {}

    getNumberOfToyotaSeats() {
        return this.numberOfSeats;
    }
}

export class Honda {

    constructor( private numberOfSeats: number ) {}

    getNumberOfHondaSeats() {
        return this.numberOfSeats;
    }
}
```
Se planea agregar una nueva marca de autos, veremos que el código nos cobrará la deuda técnica, será de muchos ajustes. Luego por supuesto veremos como refactorizar el código con principio de Open and Close y Principio de sustitución de Liskov.

Crear marca Volvo según la estructura presente:

**3.LiskovB**
Crear su nueva clase.
```
export class Volvo {

    constructor( private numberOfSeats: number ) {}

    getNumberOfVolvoSeats() {
        return this.numberOfSeats;
    }
}
```

3.LiskovA
Instancia a esta nueva clase:
```
const cars = [
        new Tesla(7),
        new Audi(2),
        new Toyota(5),
        new Honda(5),
        new Volvo(2),
    ];
```

Ahora nos presenta un error, ya no cumple la interfaz que tenemos definida en el mismo archivo. Esta sería la clara violación del principio de Liskov.
```
const printCarSeats = ( cars: ( Tesla | Audi | Toyota | Honda)[] ) => {
```

solución:
```
const printCarSeats = ( cars: ( Tesla | Audi | Toyota | Honda | Volvo )[] ) => {
```

Ahora tenemos que acceder al método y colocar una condicional que lo evalué. Otra clara violación, pero esta vez al principio de Open and Close, ya que nos hace modificar el método para una edición.
```
    if( car instanceof Volvo ) {
                console.log( 'Volvo', car.getNumberOfVolvoSeats() )
                continue;
    }
```

**Ahora vamos a refactorizar nuestro código.**
Al ver nuestras clases mantienen un método en común cada una de ellas, entonces podríamos resumirlo. No lo hacemos con todas las clases y tiene sentido mantenerlas separadas porque cada una a futuro se alimentaria de métodos únicos, por ejemplo, consumo de combustible, tenemos autos eléctricos ellos no lo ocuparían, pero si un tiempo de carga, entonces se quedaran separadas pensando en la realidad.

Se creará una *clase abstracta para vehículo*, esto es propio de la programación orientada a objetos, esto nos ayudara con *la herencia*. Ya sabemos que clean code recomienda la composición sobre la herencia, pero en este caso es la solución mas viable.  Porque buscamos que cada una de las clases tenga acceso a los métodos que la clase abstracta va a darles.
**3.LiskovB**
```
export abstract class Vehicle {

    abstract getNumberOfSeats(): number;
    
}
```

Ahora cada clase va a heredar de Vehicle y al ser abstracta nos obligara a implementar el método que contiene en cada una de ellas.

**3.LiskovB refactorizado**
De esta forma concluimos la refactorización de la clase.
```
export abstract class Vehicle {

    abstract getNumberOfSeats(): number;

}

export class Tesla extends Vehicle{

    constructor( private numberOfSeats: number ) {
        super();
    }

    getNumberOfSeats() {
        return this.numberOfSeats;
    }
}

export class Audi extends Vehicle{

    constructor( private numberOfSeats: number ) {
        super();
    }

    getNumberOfSeats() {
        return this.numberOfSeats;
    }
}

export class Toyota extends Vehicle{

    constructor( private numberOfSeats: number ) {
        super();
    }

    getNumberOfSeats() {
        return this.numberOfSeats;
    }
}

export class Honda extends Vehicle{

    constructor( private numberOfSeats: number ) {
        super();
    }

    getNumberOfSeats() {
        return this.numberOfSeats;
    }
}

export class Volvo extends Vehicle{

    constructor( private numberOfSeats: number ) {
        super();
    }

    getNumberOfSeats() {
        return this.numberOfSeats;
    }
}
```

**3.LiskovA**
Ahora veremos el tema de la interfaz donde debemos especificar el nombre de la marca, ya que debería permitirnos colocar cualquier marca y mantenerse inalterable.
```
const printCarSeats = ( cars: (Tesla | Audi | Toyota | Honda | Volvo)[] ) => {
```

Vamos a decirle que cars: ahora es de tipo Vehicle, de esta forma nos permitirá recibir cualquier marca que sea subclase de la clase Vehicle. Principio sustitución de Liskov.
```
const printCarSeats = ( cars: Vehicle[] ) => {
```

Cambiamos cada una de las instancias a métodos de los condicionales. Vemos que un cambio les hizo mucho daño, por violar el principio de Open and Close.
```
const printCarSeats = ( cars: Vehicle[] ) => {
    
    for (const car of cars) {
        
        if( car instanceof Tesla ) {
            console.log( 'Tesla', car.getNumberOfSeats() )
            continue;
        }
        if( car instanceof Audi ) {
            console.log( 'Audi', car.getNumberOfSeats() )
            continue;
        }
        if( car instanceof Toyota ) {
            console.log( 'Toyota', car.getNumberOfSeats() )
            continue;
        }
        if( car instanceof Honda ) {
            console.log( 'Honda', car.getNumberOfSeats() )
            continue;
        }
        if( car instanceof Volvo ) {
            console.log( 'Volvo', car.getNumberOfSeats() )
            continue;
        }         
    }
}
```

Perfecto ahora si hacemos una *nueva clase “Ford”* con su instancia de la marca “Ford” por el principio de sustitución de Liskov nos permite ejecutar sin problemas.

**3.LiskovB**
```
export class Ford extends Vehicle{

    constructor( private numberOfSeats: number ) {
        super();
    }

    getNumberOfSeats() {
        return this.numberOfSeats;
    }
}
```

**3.LiskovA**
```
const cars = [
        new Tesla(7),
        new Audi(2),
        new Toyota(5),
        new Honda(5),
        new Volvo(2),
        new Ford(2),
    ];
```

Pero la deuda técnica con el principio de Open and Close nos cobra factura, el código condicional fallo con esta modificación (No nos imprimió nada en consola como esperábamos, ya que el principio de Liskov nos permite que la función acepte cualquier valor que sea subclase de Vehicle para la ejecución). Esto ocurrió por no escribir código fácil de mantener y tolerante a cambios. 
**Ahora vamos a refactorizarlo también:**
```
cars.forEach( car => {
            console.log( car.constructor.name, car.getNumberOfSeats())
        });
```

Listo con estas tres líneas de código evitamos todos los condicionales if actuales y por venir. Ahora tenemos el código listo.
*Para agregar una nueva marca solo sigue 2 pasos:*
* 1.	Crea una nueva subclase en 3.LiskovB con su nombre respectivo.
* 2.	Crea una nueva instancia de la marca en 3.LiskovA arreglo cars.
Eso seria todo, no se debe modificar nada. Parece mentira luego de todo lo que tuvimos que cambiar antes, pero esta es la facilidad de acatar los principios SOLID, en este caso respetamos el principio de Open and Close y el mas importante sustitución de Liskov.
###### Código final:

**3.LiskovA**
```
import { Tesla, Audi, Toyota, Honda, Volvo, Vehicle, Ford } from './3.LiskovB';

(() => {
    
    const printCarSeats = ( cars: Vehicle[] ) => {
        
        cars.forEach( car => {
            console.log( car.constructor.name, car.getNumberOfSeats())
        });
        
    }
    
    const cars = [
        new Tesla(7),
        new Audi(2),
        new Toyota(5),
        new Honda(5),
        new Volvo(2),
        new Ford(2),
    ];

    printCarSeats( cars );

})();
```

**3.LiskovB**
```
export abstract class Vehicle {

    abstract getNumberOfSeats(): number;

}

export class Tesla extends Vehicle{

    constructor( private numberOfSeats: number ) {
        super();
    }

    getNumberOfSeats() {
        return this.numberOfSeats;
    }
}

export class Audi extends Vehicle{

    constructor( private numberOfSeats: number ) {
        super();
    }

    getNumberOfSeats() {
        return this.numberOfSeats;
    }
}

export class Toyota extends Vehicle{

    constructor( private numberOfSeats: number ) {
        super();
    }

    getNumberOfSeats() {
        return this.numberOfSeats;
    }
}

export class Honda extends Vehicle{

    constructor( private numberOfSeats: number ) {
        super();
    }

    getNumberOfSeats() {
        return this.numberOfSeats;
    }
}

export class Volvo extends Vehicle{

    constructor( private numberOfSeats: number ) {
        super();
    }

    getNumberOfSeats() {
        return this.numberOfSeats;
    }
}

export class Ford extends Vehicle{

    constructor( private numberOfSeats: number ) {
        super();
    }

    getNumberOfSeats() {
        return this.numberOfSeats;
    }
}
```

#### Interface Segregation Principle (ISP)
Principio de segregación de interfaz
> “Los clientes no deberían estar obligados a depender de interfaces que no utilicen” -Rober C. Martin

Este principio establece que los cliente3s no deberían verse forzados a depender de interfaces que no usan.
Por ejemplo, tenemos un método de Volar y nos dice que tenemos que implementarla, pero nosotros como personas no podemos volar. Ahora que si lo implemento y este método cambia significativamente, me va a afectar directamente aunque no lo quiera.


##### Código:
Tendremos el manejo de cierto tipo de aves como clases y sus actividades como métodos. Veremos que algunas aves pueden realizar actividades propias que otras no, ejemplo unas podrán volar y otras no, unas podrán nadar, otras correr.
```
class Toucan {
    public fly() {}
    public eat() {}
} 

class Hummingbird {
    public fly() {}
    public eat() {}
}
```

Son los dos primeros ejemplos, pero notamos que tienen los mismos métodos en común, podemos hacer uso de una interfaz. A medida que ingresemos más aves tendremos más métodos en común alimentando la interfaz.
```
interface Bird {
    fly(): void;
    eat(): void;
}
```

Ahora veremos el problema que genera la interfaz al obligarnos implementar los métodos en aves que no los usan, como un avestruz que no puede volar.
```
 interface Bird {
    fly(): void;
    eat(): void;
}

class Toucan implements Bird {
    public fly() {}
    public eat() {}
} 

class Hummingbird implements Bird {
    public fly() {}
    public eat() {}
}

class Ostrich implements Bird {
    public fly() {
        throw new Error('esta ave no vuela');
    }
    public eat() {}
    public run() {}
}
```

Con un throw Error podemos solucionarlo momentáneamente. Pero si en algún momento el método llega a cambiar, por ejemplo, ahora retorna un numero de minutos de vuelo. Nos llevaría a una falla, tendríamos que editar el método a retornar 0 por ejemplo.
Pero todo esto nos lleva a violar el principio de segregación de interfaces.
Tenemos ahora una clase más, un pingüino que no puede volar, pero esta ave puede nadar como otras, un pato, por ejemplo. Entonces tendríamos el método de nadar en la interfaz, lo que nos obligaría a implementarlo en cada uno de los métodos anteriores y solventarlos con un throw Error de “esta ave no puede nadar”. Un dolor de cabeza este tema.

```
class Penguin implements Bird {
    public fly() {
        throw new Error('esta ave no vuela');
    }
    public eat() {}
    public run() {}
    public swim() {}
}
```

Ahora veremos cómo solucionar implementando el principio de segregación.
Tendremos una nueva interfaz para los tipos de aves especiales, tenemos claro que todas las aves comen o mínimo pueden caminar, por ello mantendremos la interfaz de Ave.
Ahora la primera segregación es la interfaz FlyingBird, de esta forma solo afectaremos las aves que si vuelan y en caso de un cambio en el método de volar solo afectaría a las aves que en verdad lo necesitan, las aves como avestruz y pingüino no se verían afectadas al no implementar el método.
```
interface Bird {
    eat(): void;
    run(): void;
}

interface FlyingBird {
    fly(): void;
}

class Toucan implements Bird, FlyingBird {
    public fly() {}
    public eat() {}
    public run() {}
} 

class Hummingbird implements Bird, FlyingBird {
    public fly() {}
    public eat() {}
    public run() {}
}

class Ostrich implements Bird {
    public eat() {}
    public run() {}
}

class Penguin implements Bird {
    public eat() {}
    public run() {}
    public swim() {}
}
```

El mismo caso sería apara las aves que pueden nadar, podría ser otra segregación.
Ahora nos dicen el método run será para evaluar la cantidad de distancia recorrida para aves terrestres o que su principal desplazamiento es caminando. Debemos hacer una segregación para este método, ya que los tucanes por ejemplo o los colibríes no viven desplazándose por el suelo, ellos tienen su método principal de volar.
```
interface Bird {
    eat(): void;
}

interface FlyingBird {
    fly(): void;
}

interface RunningBird {
    run(): void;
}

interface SwimmerBird {
    swim(): void;
}

class Toucan implements Bird, FlyingBird {
    public eat() {}
    public fly() {}
} 

class Hummingbird implements Bird, FlyingBird {
    public eat() {}
    public fly() {}
}

class Ostrich implements Bird, RunningBird {
    public eat() {}
    public run() {}
}

class Penguin implements Bird, SwimmerBird {
    public eat() {}
    public swim() {}
}
```

Perfecto, ahora si témenos un cambio por ejemplo de cuantos minutos puede estar volando un ave sin descanso, modificamos run() en la interfaz RunningBird que nos retorne un número, ahora bien como esta interfaz solo la implementan las aves que vuelan los demás no se verían afectados en nada.

```
interface FlyingBird {
    fly(): number;
}
```

```
class Toucan implements Bird, FlyingBird {
    public eat() {}
    public fly() { return 20}
} 

class Hummingbird implements Bird, FlyingBird {
    public eat() {}
    public fly() { return 10}
}

class Ostrich implements Bird, RunningBird {
    public eat() {}
    public run() {}
}

class Penguin implements Bird, SwimmerBird {
    public eat() {}
    public swim() {}
}
```

Podemos ver que nos facilitó solo modificar los métodos que si lo usan, los demás se mantuvieron intactos. Gracias a la Al principio de segregación de interfaces no somos obligados a implementar métodos innecesarios.

##### Detectar violaciones.

Como se puede notar este principio esta estrechamente relacionado con el principio de responsabilidad única y el principio de sustitución des Liskov.

-	Si las interfaces que diseñamos nos obligan a violar los principios de responsabilidad única y sustitución de Liskov.
Tal vez por la cantidad de interfaces a crear es un poco tedioso manejarlas y clasificarlas, pero a largo plazo este buen manejo se paga al querer implementar mas código, mantenerlo o realizar ediciones. En cambio, cuando por pereza tal vez recurrimos a dejar sin refactorizar, estas interfaces violando varios principios también nos da un pago y no de los buenos, cuando queremos hacer un cambio, o implementar más código todo el código antiguo comienza a fallar y se convierte en una cadena de errores a solucionar.
Por eso es mejor recorrer la milla extra y hacer un código de calidad que tanto para ti como para otro desarrollador es muy agradable poder encontrar código de calidad, disponible para aceptar cambios.

