# Deuda técnica.

## ¿Qué es la deuda técnica? 
-	Falta de calidad en el código – documentación – pruebas.
-	Genera una deuda que repercutirá en el futuro.

**Genera costos económicos, Tiempo en:**
-	realizar mantenimiento.
-	Refactorizar código.
-	Comprender código.
-	Transferencia de código.

**Esquema de deuda técnica de Martin Fowler.**
1.	Imprudente: No hay tiempo, solo copia y pega eso de nuevo.
2.	Inadvertido: ¿Que son patrones de diseño? (Falta de experiencia - Junior)
3.	Prudente: Tenemos que entregar rápido, ya refactorizaremos. (Postergar algo que se debe optimizar y nunca hacerlo).
4.	Prudente e inadvertida: Ahora sabemos cómo lo deberíamos haber hecho. (Cuando se tiene el conocimiento y se cae en cuenta que tenemos falencia o deudas en el código ya realizado – en mitad o con parte avanzada del proyecto).
Caer en deuda técnica es normal y a menudo es inevitable.



## ¿Cómo se paga la deuda técnica?

 **Refactorización:**
Es simplemente un proceso que tiene como objetivo mejorar el código sin alterar su comportamiento para que sea mas entendible y tolerante a cambios.
Usualmente se deben tener pruebas automáticas que avalen que la refactorización fue un éxito y no quedaron fallas nuevas.
Sin pruebas se produce el famoso: **“Si funciona no lo toques y déjalo así”.**
La mala calidad en el software siempre la acaba pagado o asumiendo alguien. Ya sean el cliente, el proveedor con los recursos o el propio desarrollador dedicando tiempo a refactorizar o malgastando tiempo programando sobre un sistema frágil.

> “Código limpio es aquel que se ha escrito con la intención de que otra persona (o tu mismo en el futuro) lo entienda- Carlos Ble.

> “Programar es el arte de decirle a otro humano lo que quieres que la computadora haga” – Donald Knuth.



## Refactorización
### Nombres de variables
#### 1.	Nombres pronunciables y expresivos:
Preferiblemente en inglés.
Evitar el uso de _ guion bajo en las variables, excepción de las convenciones que tiene cada uno de los lenguajes.
Se aconseja usar Camel Case. (palabraUnoDosTres).
Evitar nombre cortos (n , x, l, tx) que no expresan el contenido real de dicha variable.


```
// mal
const n = 53;
const tx = 0.15;
const cat = 'T-shirt';
const ddmmyyyy = new Date('August 15, 1965 00:00:00');

// mejor
const numberOfUnits = 53;
const tax = 0.15;
const category = 'T-shirt';
const birthDate = new Date('August 15, 1965 00:00:00');
```

En el uso de clases se prefiere evitar el sobre nombramiento o repetir algo que es evidente durante la implementación del código.

```
// mal 
class AbstractUser { };
class UserMixin { };
class UserImplementation {};
interface UserInterface {} ;

// mejor 
class User { };
interface User { } ;

```


#### 2. Nombres según el tipo de dato.
**Arreglos:** 
Deben ser descriptivos según su tipo de contenido: animales, frutas. 

Aún pueden ser más descriptivos:
 	Nombre de frutas, edad de animales, nacionalidad de estudiantes.

```
// malo
const fruit = ['manzana', 'platano', 'fresa'];
// regular
const fruitList = ['manzana', 'platano', 'fresa'];
// bueno
const fruits = ['manzana', 'platano', 'fresa'];
// mejor
const fruitNames = ['manzana', 'platano', 'fresa'];
```

Usar List cuando se tiene una verdadera lista de objetos o instancias contenidos dentro del arreglo. Tenemos una lista de frutas. - fruitList 
```
	const fruitList = [
        	{
            		name: 'manzana',
            		color: 'red',
            		seeds: 6
        	},
        	{
            		name: 'platano',
            		color: 'yellow',
            		seeds: 0
        	},
        	{
            		name: 'fresa',
            		color: 'red',
            		seeds: 100
        	}
   	 ];
```
 
***Booleanos:*** 
Los booleanos tienen dos estados generalmente true, false.  Los prefijos Is, an, can son excelentes para ayudar a declarar estas variables con más sentido, se procura que su significado sea positivo y evitar las negaciones en el nombre: 
```
// malo
    const notEmpty = true;  // noVacío = verdadero;   
    const notEmpty =false;  // noVacío = false; 
```

Esto confunde, no es claro si está vacío o no a simple vista, 
a diferencia de:

```
// mejor
const isEmpty = true; // está vacío = verdadero;  
```
Ejemplo:
```
// malo
const open = true;
const write = true;
const fruit = true;
const active = false;
const noValues = true;
const notEmpty = true;

// mejor
const isOpen = true;
const canWrite = true;
const hasFruit = true;
const isActive = false;
const hasValues = true;
const isEmpty = true;
```


 
***Numéricos:*** 
Deben hacer referencia a que equivale el numero almacenado, Se aconseja hacer uso de : min, max, total, of.
```
// malo
const fruits = 3;
const cars = 10;

// mejor
const maxFruits = 3;
const minFruits = 1;
const totalFruits = 20;

const totalOfCars = 10;
```
***Nombres para funciones:***
Deben representar acciones, que por lo general se deben construirse usando el verbo que representa la acción seguidos de un sustantivo:
Deben ser bien descriptivos y concisos, debe expresar lo que ejecutara, pero debe abstenerse de poner todo lo que hace la implementación. 
```
// malo
createUserIfNotExists(); 
updateUserIfNotEmpty();
sendEmailIfFieldsValid();

// mejor
createUser();  
updateUser();
sendEmail();
```
Es claro que las validaciones de **“Crear un usuario si no existe”**, **“actualizar un usuario si no esta vacío”** y **“enviar un email si los campos son válidos”** estarán contenidos dentro de la lógica de la función, está de más colocarlo en el nombre de la función.

***Consideración para las clases:***
Deben de tener nombres formados por un sustantivo o frases de sustantivo, evitar nombres genéricos:
El nombre es lo mas importante de la clase: cuando se tiene un nombre genérico se termina agregándole demasiada responsabilidad a la misma, lo cual la hace difícil de mantener y actualizar.
Usar Upper Camel Case.

> **3 preguntas para determinar saber si es un bien nombre:**
> *	¿Qué exactamente hace la clase? 
> *	¿Cómo exactamente esta clase realiza cierta tarea?
> *	¿Hay algo específico sobre si ubicación?

**Extra:** Si algo no tiene sentido se debe remover o refactorizar.

> Más palabras ¡==  mejor nombre
```
class SpecialViewingCaseMonsterManagerEventsHandlerActivitySingleton {};
```

Con un nombre tan largo podemos identificar que vamos a terminar con una clase supercargada de funciones.



#### 3.	Funciones: 

> Sabemos que estamos desarrollando código limpio cuando cada función hace exactamente lo que su nombre indica. – Ward Cunningham
```
// malo
    function sendEmail(): boolean {
        // Verificar si el usuario existe
        // Revisar contraseña
        // Crear usuario en la base de datos
        // si todo sale bien 
        return true;
    }
 ```

La función anterior **no realiza lo que dice su nombre**, en realidad según su contexto  su nombre debería ser **“CreateUser”**, En ningún punto envía un email, lo que hace es validar y registrar un usuario.
 
 ***Parámetros:***
Son los datos que espera recibir una función.
```
// Bien
    function sendEmail(toWhom: string, from: string, body: string):boolean {
        // enviar email
        return true;
    }
```

Se aconseja limitar a máximo 3 parámetros, un número superior comienza a darle una apariencia aglomerada.

```
// No muy bien
function sendEmail(toWhom: string, from: string, body: string, subject: string, apiKey: string ) : boolean {

}
```

Se aclara no está mal, solo se aconseja evitarlo y limitar a máximo 3.
 
***¿Como hacer cuando son más de 3 parámetros?***

Sencillo, lo más aconsejable es enviarlos por medio de un objeto o arreglo y al recibirlo en la función realizar la desestructuración ({}).

```
// mucho mejor
function sendEmail( {toWhom, from, body, subject, apiKey}:SendEmailOptions) : boolean {

}
```

Por último, se aconseja ordenar los parámetros por orden alfabético, en los ejemplos están desordenados, pero esta sería una mejor forma de entender el código cuando lo revisa otra persona extra a quien lo construyo.

Argumentos:
Son los datos que se envían al consumir o instanciar una función que espera parámetros.


		


***Recomendaciones:***
*	La simplicidad es fundamental.
*	Funciones de tamaño reducido.
*	Funciones de una sola línea sin causar demasiada complejidad.
*	Menos de 20 líneas de proceso.
*	Evitar el uso del condicional else.
*	Prioriza el uso de la **condicional ternaria.** 

```
return (isDead) ? 5000 : 2000;
```
es igual a :
```
    if ( isDead ) {
        return 5000;
    } else {
        return 2000;
    }
```



## Principio DRY - Don’t Repeat Yourself
> “Si quieres ser un programador productivo esfuérzate por escribir código legible”  - Rober C. Martin

* Evitar tener duplicidad de código.
* Simplifica las pruebas.
* Ayuda a centralizar procesos.
* Aplicar el principio DRY, usualmente lleva a refactorizar.

```
class Product {

    constructor(
        public name: string = '',
        public price: number = 0,
        public size: string = '',
        public inStock: boolean = false,
    ) { }
    
    // No DRY - Una comparación para cada atributO
    isProductReady(): boolean {
       if (this.name.length <= 0) throw Error('name is empty');
       if (this.price <= 0) throw Error('price is zero');
       if (this.size.length <= 0) throw Error('size is empty');
       if (this.inStock.length == false) throw Error('inStock is false');
        
        return true;
    }


    toString() {
        if (!this.isProductReady()) return;

        return `${this.name} -  $ ${this.price} - ${this.size} - ${this.inStock}`;
    }
}

(() => {
    const bluePants = new Product('Blue pants', 55, 'M', true);
    console.log(bluePants.toString());
})();
}
```

DRY

```
class Product {

    constructor(
        public name: string = '',
        public price: number = 0,
        public size: string = '',
        public inStock: boolean = false,
    ) { }

    // DRY
    //  Por typo nos ayuda disminuir las lineas repetidas
    // con case: 'string' evaluamos todos los string sim importar su nombre. Ejempo:
    // Nombre - Descripcion - Tamanio - etc.
    // case 'number': precio, cantidad
    isProductReady(): boolean {
        
        for (const key in this) {
            switch (typeof this[key]) {
                case 'string':
                    if ((<string><unknown>this[key]).length <= 0) throw Error(`X ${key} is empty`);
                    break;
                case 'number':
                    if ((<number><unknown>this[key]) <= 0) throw Error(`X ${key} is zero`);
                    break;
                case 'boolean':
                    if (<boolean><unknown>(this[key]) == false) throw Error(`X ${key} is false`);
                    break;
                default:
                    throw Error(`X ${typeof this[key]} is not valid`);
            }

        }
        return true;
    }


    toString() {
        if (!this.isProductReady()) return;

        return `${this.name} -  $ ${this.price} - ${this.size} - ${this.inStock}`;
    }
}

(() => {
    const bluePants = new Product('Blue pants', 55, 'M', true);
    console.log(bluePants.toString());
})();
```




