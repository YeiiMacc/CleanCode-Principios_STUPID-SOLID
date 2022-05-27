# STUPID – Code Smells.

## STUPID:
Se aclara que estos son principios y no son reglas, simplemente deberían evitarse en lo posible.

### Acrónimo STUPID
**6 code smells que se deben evitar**
* **S**ingleton: Patrón singleton.
* **T**ight Coupling: Alto acoplamiento.
* **U**ntestability: Código no probable (unit test).
* **P**remature optimization: Optimizaciones prematuras.
* **I**ndescriptive Naming: nombres poco descriptivos.
* **D**uplication: Duplicidad de código, no aplicar el principio DRY.

### Singleton: Patrón singleton.
Son principios y no reglas, hasta donde sea posible se recomienda evitar el patrón Singleton, pues son pocos puntos fuertes que brinda este patrón, aunque en algunos casos es necesario.

**Pros:** 
*	Garantiza una única instancia de la clase a lo largo de toda la aplicación.

**Contras (Por qué es un Code Smells ):**
*	Vive en el contexto global.
*	Puede ser modificado por cualquiera en cualquier momento.
*	No es rastreable.
*	Difícil de testear debido a su ubicación.

```
    const Singleton = (function () {
        
        let instance;

        function createInstance() {
            return new Object('I am the instance');
        }

        return {
            getInstance() {
                if (!instance) {
                    instance = createInstance();
                }
                return instance;
            }
        };
    })();

    function main() {

        const instance1 = Singleton.getInstance();
        const instance2 = Singleton.getInstance();

        console.log('Misma instancia? ', (instance1 === instance2));
    }

    main();
```


### Tight Coupling: Alto acoplamiento:
Se quiere evitar el Alto acoplamiento y baja cohesión.

**Desventajas:**
*	Un cambio en un modulo por lo general provoca un efecto domino o efecto de ola de agua de cambios en otros modulos.
*	El ensamble de módulos puede requerir mas esfuerzo y/o tiempo debido a la mayor dependencia entre módulos.
*	Un modulo en particular puede ser más difícil de reutilizar y/o probar porque deben incluir módulos dependientes.

Lo ideal es tener bajo acoplamiento y buena cohesión.

**Posibles soluciones:**
*	“A” tiene un atributo que referencie a “B”
*	“A” llama a los servicios de un objeto “B”
*	“A” tiene un método que hace referencia a “B” (a través del tipo de retorno o parámetro.)
*	“A” es una subclase de (o implementa) la clase “B”.

> “Queremos diseñar componentes que sean autocontenidos, auto suficientes e independientes. Con un objetivo y un propósito bien definido” -The Pragmatic Programer

#### Cohesión:
Lo ideal es tener bajo acoplamiento y buena cohesión.
**¿Pero que es la cohesión?**
*	La cohesión se refiere a lo que la clase (o modulo) puede hacer.
*	La baja cohesión significaría que la clase realiza una gran variedad de acciones: es amplia, no se enfoca en lo que debe hacer.
*	Alta cohesión significa que la clase se enfoca en lo que debería estar haciendo, es decir, solo métodos relacionados con la intensión de la clase.


#### Acoplamiento:
Lo ideal es tener bajo acoplamiento y buena cohesión.
**¿Pero que es el acoplamiento?**
Se refiere a cuan relacionadas o dependientes son dos clases o módulos entre sí.
*	En bajo acoplamiento, cambiar algo importante en una clase no debería afectar a la otra.
*	En alto acoplamiento, dificultaría el cambio y el mantenimiento de su código; dado que las clases están muy unidas, hacer un cambio podría requerir una renovación completa del sistema.
> Un buen diseño de software tiene alta cohesión y bajo acoplamiento.

La herencia genera un alto acoplamiento y un problema muy notable al modificar una clase padre. Ejemplo :

```
(()=>{
    // No aplicando el principio de responsabilidad única
    type Gender = 'M'|'F';

    // Alto Acoplamiento

    class Person {
        constructor(
            public name: string,
            public gender: Gender,
            public birthdate: Date,
        ){}
    }

    class User extends Person {
        constructor(
            public email: string,
            public role: string,
            private lastAccess: Date,
            name: string,
            gender: Gender,
            birthdate: Date,
        ){
            super(name, gender, birthdate);
            this.lastAccess = new Date();
        }

        checkCredentials() {
            return true;
        }
    }

class UserSettings extends User {
    constructor(
        public workingDirectory: string,
        public lastFolderOpen: string,
        email     : string,
        role      : string,
        name      : string,
        gender    : Gender,
        birthdate : Date,
    ){
        super(
            email,
            role,
            new Date(),
            name,
            gender,
            birthdate
        )
    }
}
    
    const userSettings = new UserSettings(
        '/urs/home',
        '/development',
        'YeiiMacc@google.com',
        'Admin',
        'Yeison',
        'M',
        new Date('1985-10-21')
    );

    console.log({ userSettings, credentials: userSettings.checkCredentials() });
    
})();

```

Usuario hereda de Persona, al hacer un cambio pequeño Usuario se verá muy afectado en su ejecución.

```
    public firstName: string,
    public lastName: string,
```

```
(() => {

    type Gender = 'M'|'F';

    class Person {
        constructor(
            public firstName: string,
            public lastName: string,
            public gender: Gender,
            public birthdate: Date,
        ){}
    }

    class User extends Person {
        constructor(
            public email: string,
            public role: string,
            private lastAccess: Date,
            // Falla al cambiar nombre
            name: string,
            gender: Gender,
            birthdate: Date,
        ){
            // Falla al cambiar nombre
            super(name, gender, birthdate);
            this.lastAccess = new Date();
        }

        checkCredentials() {
            return true;
        }
    }
})();

```

Podemos solucionarlo manualmente:

```
(() => {

    type Gender = 'M'|'F';

    class Person {
        constructor(
            public firstName: string,
            public lastName: string,
            public gender: Gender,
            public birthDate: Date,
        ){}
    }

    class User extends Person {
        constructor(
            public email: string,
            public role: string,
            private lastAccess: Date,
            // Solucion
            firstName: string,
            lastName: string,
            gender: Gender,
            birthDate: Date,
        ){
            // Solucion
            super(firstName, lastName, gender, birthDate);
            this.lastAccess = new Date();
        }

        checkCredentials() {
            return true;
        }
    }
})();

```

Pero si tenemos mas clases heredando, cada de una de ellas fallaría debido a su dependencia (Alto acoplamiento), arreglar manualmente una es sencillo, pero si tenemos 5 clases o mas heredando será un dolor de cabeza.

```
(() => {
    // No aplicando el principio de responsabilidad única
    type Gender = 'M'|'F';

    // Alto Acoplamiento

    class Person {
        constructor(
            public firstName: string,
            public lastName: string,
            public gender: Gender,
            public birthDate: Date,
        ){}
    }

    class User extends Person {
        constructor(
            public email: string,
            public role: string,
            private lastAccess: Date,
            firstName: string,
            lastName: string,
            gender: Gender,
            birthDate: Date,
        ){
            super(firstName, lastName, gender, birthDate);
            this.lastAccess = new Date();
        }

        checkCredentials() {
            return true;
        }
    }

class UserSettings extends User {
    constructor(
        public workingDirectory: string,
        public lastFolderOpen: string,
        email     : string,
        role      : string,
        firstName: string,
        lastName: string,
        gender    : Gender,
        birthDate : Date,
    ){
        super(
            email,
            role,
            new Date(),
            firstName,
            lastName,
            gender,
            birthDate
        )
    }
}

    const userSettings = new UserSettings(
        '/urs/home',
        '/development',
        'YeiiMacc@google.com',
        'Admin',
  'Yeison',
        'Macias',
        'M',
        new Date('1985-10-21')
    );

    console.log({ userSettings, credentials: userSettings.checkCredentials() });
    
})()

```

**Ahora veremos el mismo ejemplo con composición de clases:**

```
(()=>{
    // Aplicando el principio de responsabilidad única
    // Prioriza la composición frente a la herencia

    type Gender = 'M'|'F';

    interface PersonProps {
        name     : string;
        gender   : Gender;
        birthdate: Date;
    }

    class Person {
        public name     : string;
        public gender   : Gender;
        public birthdate: Date;

        constructor({ name, gender, birthdate }: PersonProps ){
            this.name = name;
            this.gender = gender;
            this.birthdate = birthdate;
        }
    }

    interface UserProps {
        email     : string;
        role      : string;
    }
    class User {

        public email       : string;
        public role        : string;
        private lastAccess : Date;

        constructor({ email, role }: UserProps ){
            this.lastAccess = new Date();
            this.email = email;
            this.role = role;
        }

        checkCredentials() {
            return true;
        }
    }

    interface SettingsProps {
        lastFolderOpen  : string;
        workingDirectory: string;
    }

    class Settings {
        public workingDirectory: string; 
        public lastFolderOpen  : string; 

        constructor({ workingDirectory, lastFolderOpen }: SettingsProps ){
            this.workingDirectory = workingDirectory;
            this.lastFolderOpen = lastFolderOpen;
        }
    }
    
    
    // Nuevo User Settings
    interface UserSettingsProps {
        birthdate       : Date;
        email           : string;
        gender          : Gender;
        lastFolderOpen  : string;
        name            : string;
        role            : string;
        workingDirectory: string;
    }

    class UserSettings {
        // constructor(
        //     public person: Person,
        //     public user  : User,
        //     public settings: Settings,
        // ){}
        public person  : Person;
        public user    : User; 
        public settings: Settings;

        constructor({ 
            name, gender, birthdate,
            email, role,
            workingDirectory, lastFolderOpen,
        }: UserSettingsProps) {
            this.person = new Person({ name, gender, birthdate });
            this.user = new User({ email, role });
            this.settings = new Settings({workingDirectory, lastFolderOpen})
        }
    }
    

    const userSettings = new UserSettings({
        birthdate: new Date('1985-10-21'),
        email: 'yeiimacc@google.com',
        gender: 'M',
        lastFolderOpen: '/home',
        name: ' Yeison',
        role: 'Admin',
        workingDirectory: '/usr/home'
    });

    console.log({ userSettings, credentials: userSettings.user.checkCredentials() });
    
})()

```

A simple vista parece mucho más trabajo, pero lo increíble es cuando sucede un cambio, ya que solo se debe ajustar una pequeña parte sin importar la cantidad de clases gracias al bajo acoplamiento.
Simplemente se modifica la interfaz y clase al que presenta el cambio y por último la clase que hace la instancia ( conexión de clases, por llamarlo de otra forma).

```
    interface PersonProps {
        firstName: string;
        lastName: string;
        gender: Gender;
        birthDate: Date;
    }

    class Person {
        public firstName: string;
        public lastName: string;
        public gender: Gender;
        public birthDate: Date;

        constructor({ firstName, lastName, gender, birthDate }: PersonProps) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.gender = gender;
            this.birthDate = birthDate;
        }
    }

```

```
// Nuevo User Settings
    interface UserSettingsProps {
        birthDate: Date;
        email: string;
        gender: Gender;
        lastFolderOpen: string;
        firstName: string;
        lastName: string;
        role: string;
        workingDirectory: string;
    }

    class UserSettings {
        public person: Person;
        public user: User;
        public settings: Settings;

        constructor({
            firstName, lastName, gender, birthDate,
            email, role,
            workingDirectory, lastFolderOpen,
        }: UserSettingsProps) {
            this.person = new Person({ firstName, lastName, gender, birthDate });
            this.user = new User({ email, role });
            this.settings = new Settings({ workingDirectory, lastFolderOpen })
        }
    }

```

Y por último la información que entrara recibe el segundo atributo:

```
    const userSettings = new UserSettings({
        birthDate: new Date('1985-10-21'),
        email: 'yeiimacc@google.com',
        gender: 'M',
        lastFolderOpen: '/home',
        firstName: 'Yeison',
        lastName: 'Macias',
        role: 'Admin',
        workingDirectory: '/usr/home'
    });

```

### Untestability: Código no probable (unit test).
Código difícilmente testeable.
*	Código con alto acoplamiento.
*	Código con muchas dependencias no inyectadas.
*	Dependencias en el contexto global (Tipo singleton)
Debemos tener en mente las pruebas desde la creación del código.


### Premature optimization: Optimizaciones prematuras.
Mantener abiertas las opciones retrasando la toma de decisiones nos permite darle mayor relevancia a lo que es más importante, como las reglas de negocio.
No debemos anticiparnos a los requerimientos y desarrollar abstracciones innecesarias que puedan añadir complejidad accidental.
#### Complejidad accidental:
* Es cuando implementamos una solución compleja a la mínima indispensable.
* Por ejemplo, no vamos a generar todo un patrón o importar una librería para sumar dos números.

#### Complejidad esencial:
* Esta es inherente al problema.
* Por ejemplo, no vamos a generar todo un patrón o importar una librería para sumar dos números.
* Entonces debemos encontrar un equilibrio entre las dos complejidades y lograr las mejores soluciones posible.

### Indescriptive Naming: nombres poco descriptivos.
*	Nombres de variables mal nombradas.
*	Nombres de clases genéricas.
*	Nombres de funciones mal nombradas.
*	Ser muy específico o demasiado genérico.


### Duplication: Duplicidad de código
no aplicar el principio DRY.
#### Duplicidad Real:
*	Código es idéntico y cumple la misma función.
*	Un cambio implicaría actualizar todo el código idéntico en varios lugares.
*	Incrementa posibilidades de error humano al olvidar una parte para actualizar.
*	Mayor cantidad de pruebas innecesarias.

Si copias y pegas código es una clara señal que debes refactorizar código, así evitamos muchos de estos problemas.


#### Duplicidad accidental:
*	Código luce similar, pero cumple funciones distintas.
*	Cuando hay un cambio, solo hay que modificar un solo lugar.
*	Este tipo de duplicidad se puede trabajar con parámetros u optimizaciones.



## Otros Code Smells

### Inflación:
**Metodos**
Cuando un método tiene demasiadas líneas de código(más de 10 líneas), debe hacernos pensar en hacer pequeños métodos que hagan su tarea pero que la hagan bien y no un método gigante difícil de mantener.
Muchos dicen no hacer muchas funciones por el rendimiento al ejecutar el código, pero en realidad el imparto es mínimo al momento de ejecutar, el gran impacto viene es al mantener el código, es mucho más sencillo y entendible mantener una hoja que un libro entero. 

**Clase:**
El mismo problema se genera con las clases, estas inician super pequeñas con actividades específicas, pero a medida que pasa el tiempo se le agregan más métodos, por no crear una nueva clase. Con el tiempo se genera una clase gigante difícil de mantener y probar.
Dividir las clases en tareas más específicas facilita muchísimo la comprensión del proyecto, Ejemplo una clase que simplemente realice la CRUD a una tabla, Una clase que se encargue de administrar el envió de los diferentes emails, así sin tener todo en una clase de cientos de líneas de código.
Esto nos ayuda a evitar la duplicidad de código también y hacer más eficientes nuestros métodos y componentes.

### Obsesión primitiva:
Esta es la obsesión de usar datos primitivos como banderas o ayudantes y no usar objetos pequeños, piensas que uno esta bien, pero a medida que incluye mas código se usa otro y otro y de esta forma se infesta el método de ellos.

Es mucho más aconsejable separar esto en clase, métodos o pequeños objetos propios de la clase que nos permitan su uso más fácil. Ejemplo:

```
//Proceso
// Proceso 
const isAdmin = 1;
if (isAdmin == 1 ){
    //Proceso
}
```

Esto para saber si 1 tiene permisos o 0 caso contrario.
Se podría solucionar colocando todo el proceso de obtener el valir de isAdmin en un método.

```
function isAdmin() {
    // Proceso
    // return true or false
    return true;
}
if (isAdmin()) {
    // Proceso
}
```

Mucho más fácil de manejar de manejar y mantener a futuro, pero lo mejor es que es independiente, cualquier cambio vario únicamente el método sin tocar lo demás.

### Lista larga de parámetros:
Ocurre cuando queremos enviar muchos, pero en realidad cantidad de parámetros a una función o método, esto nos hace pensar inmediatamente que el método esta sobre cargado de trabajo y se podría refactorizar separándolo en pequeñas partes que se complementen.
Otro caso es donde la ejecución es corta pero obligatoriamente necesita todos esos parámetros, en este caso lo más aconsejable es estructurar todo en un objeto, de esta forma es más sencillo manejar, agrupar y entender al revisar el código.

### Feature Envy  - Envidia de una característica 
Es cuando un método accede a los datos de otro objeto mas que a sus propios datos.
**Razones:**
Después de refactorizar de manera correcta o completa.
puede que el método no pertenezca a esa ubicación.

Si las cosas se mueven deberían moverse todos los relacionados, aunque esto solo con la práctica se ira notando. 

### Intimidad inapropiada.
Cuando una clase usa campos y métodos internos de otra clase.
Las buenas clases deben saber lo menos posible de otras, si por el contrario vemos dos clases muy juntas, es un indicados que algo no esta muy bien.
Al refactorizar mejora la organización de código, simplifica el soporte el soporte, reutilización del código.


### Intimidad inapropiada.
Cuando una clase usa campos y métodos internos de otra clase.
Las buenas clases deben saber lo menos posible de otras, si por el contrario vemos dos clases muy juntas, es un indicados que algo no esta muy bien.
Al refactorizar mejora la organización de código, simplifica el soporte el soporte, reutilización del código.
Ganamos:
Reducimos la cantidad de dependencia entre las clases o módulos.
Se reduce la cantidad de código.


### The middle man – El hombre de en medio.
Si esta clase hace solo una acción, pero delega el trabajo a otra clase, si este es el caso ¿por qué existe esta clase? 
Este puede ser el resultado de la eliminación excesiva de cadenas de mensajes.
Puede ser el resultado de una refactorización del punto anterior cadena de mensajes.
La solución sería replantear la funcionalidad y deshacerse de esas funcionalidades innecesarias.
