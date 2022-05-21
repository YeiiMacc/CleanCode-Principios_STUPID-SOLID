# Clases y comentarios - Deuda técnica.

## Clases
-	Las clases deben tener responsabilidades específicas y bien claras.
 - No usar nombres genéricos, lo que lleva a que terminen heredando demasiado trabajo de manera involuntaria.
Ejemplo:

**Casa**
*   Cuartos.
*   Lavanderías.
*   Patio.
*   Cochera.
*   Autos.

Al ser demasiado global contiene demasiados procesos lo cual la hace difícil de probar y de mantener.

### Principio de responsabilidad única
Una función hace una tarea, pero la hace bien. Ocurre igual con las clases, debe enfocarse en una responsabilidad única. A menos de que tenga interacción con otras clases, pero ya se trabajaría por medio de herencia.

```
// Herencia problematica
// No aplicando el principio de responsabilidad unica
    
    type Gender = 'M' | 'F';

    class Person {
        constructor(
            public name: string,
            public gender: Gender,
            public birthDate: Date
        ) { }
    }


    class User extends Person {
        public lastAccess: Date;

        constructor (
            public email: string,
            public role: string,
            name: string,
            gender: Gender,
            birthDate: Date,
        ){
            super( name, gender, birthDate );
            this.lastAccess = new Date();
        }

        checkCredentials() {
            return true;
        }
    }


    class UserSettings extends User {
        constructor(
            public workingDirectory: string,
            public lastOpenFolder : string,
            email : string,
            role: string,
            name: string,
            gender: Gender,
            birthDate: Date
        ){
            super( email, role, name, gender, birthDate );
        }
    }

    const newUserSettings = new UserSettings(
        '/user/home',
        '/home',
        'yeiimaccdev@gmail.com',
        'Admin',
        'Yeison',
        'M',
        new Date('1985-10-21')
    );

    
    console.log({ newUserSettings });
```


```
// Objetos con propiedades
// No aplicando el principio de responsabilidad unica

    type Gender = 'M' | 'F';

    interface PersonProps {
        birthDate: Date;
        gender: Gender;
        name: string;
    }

    class Person {
        public birthDate: Date;
        public gender: Gender;
        public name: string;

        constructor({ birthDate, gender, name }: PersonProps) {
            this.birthDate = birthDate;
            this.gender = gender;
            this.name = name;
        }
    }



    
    interface UserProps {
        birthDate: Date;
        email: string;
        gender: Gender;
        name: string;
        role: string;
    }

    class User extends Person {

        public email: string;
        public lastAccess: Date;
        public role: string;

        constructor({
            birthDate,
            email,
            gender,
            name,
            role,
        }: UserProps) {
            super({ birthDate, gender, name });
            this.email = email;
            this.lastAccess = new Date();
            this.role = role;
        }

        checkCredentials() {
            return true;
        }
    }




    interface UserSettingsProps {
        birthDate: Date;
        email: string;
        gender: Gender;
        lastOpenFolder: string;
        name: string;
        role: string;
        workingDirectory: string;
    }

    class UserSettings extends User {
        public lastOpenFolder: string;
        public workingDirectory: string;

        constructor({
            lastOpenFolder,
            workingDirectory,
            email,
            role,
            name,
            gender,
            birthDate
        }: UserSettingsProps) {
            super({ email, role, name, gender, birthDate });
            this.lastOpenFolder = lastOpenFolder;
            this.workingDirectory = workingDirectory;
        }
    }

    const newUserSettings = new UserSettings({
        birthDate: new Date('1985-10-21'),
        email: 'yeiimaccdev@gmail.com',
        gender: 'M',
        lastOpenFolder: '/home',
        name: 'Yeison',
        role: 'Admin',
        workingDirectory: '/user/home',
    });

    console.log({ newUserSettings });
```



```
// Aplicando el principio de responsabilidad unica
    // Priorizar la composicion frente a la herencia!

    type Gender = 'M' | 'F';

    interface PersonProps {
        birthDate: Date;
        gender: Gender;
        name: string;
    }

    class Person {
        public birthDate: Date;
        public gender: Gender;
        public name: string;

        constructor({ birthDate, gender, name }: PersonProps) {
            this.birthDate = birthDate;
            this.gender = gender;
            this.name = name;
        }
    }



    interface UserProps {
        email: string;
        role: string;
    }

    class User {

        public email: string;
        public lastAccess: Date;
        public role: string;

        constructor({
            email,
            role,
        }: UserProps) {
            this.lastAccess = new Date();
            this.email = email;
            this.role = role;
        }

        checkCredentials() {
            return true;
        }
    }



    interface SettingsProps {
        lastOpenFolder: string;
        workingDirectory: string;
    }

    class Settings {
        public lastOpenFolder: string;
        public workingDirectory: string;

        constructor({
            lastOpenFolder,
            workingDirectory,
        }: SettingsProps) {
            this.lastOpenFolder = lastOpenFolder;
            this.workingDirectory = workingDirectory;
        }
    }




    interface UserSettingsProps {
        birthDate: Date;
        email: string;
        gender: Gender;
        lastOpenFolder: string;
        name: string;
        role: string;
        workingDirectory: string;
    }

    class UserSettings {
        public person: Person;
        public user: User;
        public settings: Settings;

        constructor ({
            name, gender, birthDate,
            email, role,
            lastOpenFolder, workingDirectory
        }: UserSettingsProps ){
            this.person = new Person({ name, gender, birthDate });
            this.user = new User({ email, role });
            this.settings = new Settings({ lastOpenFolder, workingDirectory });
        }
    }

    const newUserSettings = new UserSettings({
        birthDate: new Date('1985-10-21'),
        email: 'yeiimaccdev@gmail.com',
        gender: 'M',
        lastOpenFolder: '/home',
        name: 'Yeison',
        role: 'Admin',
        workingDirectory: '/user/home',
    });

    console.log({ newUserSettings });
```



### Estructura de clases
> “El buen código parece estar escrito por alguien a quien le importa” -Michael feathers

Nuestras clases que son el punto torácico de la mayoría de las aplicaciones orientadas a objetos.
Es importante que el grupo de trabajo o desarrollo siga la misma estructura, de esta forma todos sabrán donde encontrar cada uno de los elementos. Lista recomendada:

**Comenzar con lista de propiedades:**
*   Propiedades estáticas.
*   Propiedades públicas
*   Propiedades privadas del ultimas.

**Metodos:**
*	Empezando por los constructores estáticos.
*	Luego el constructor.
*	Seguidamente métodos estáticos.
*	Métodos privados después.
*	Resto de métodos de instancia ordenados de mayor a menor importancia.
*	Getters y Setters al final.


``` 
    class HtmlElement {
        public static domReady: boolean = false;

        private _id: string;
        private type: string;
        private updateAt: number;
        
        static createInput( id: string ) {
            return new HtmlElement(id, 'input');
        }

        constructor ( id: string, type: string ) {
            this._id = id;
            this.type = type;
            this.updateAt = Date.now();
        }

        setType (type: string) {
            this.type = type;
            this.updateAt = Date.now();
        }

        get id(): string {
            return this.id;
        }

    }

```

## Comentarios

> “Es horrible leer el código de otra persona”
> Debe existir un balance entre código legible y código eficiente.

Aclarando que comentar tu código está muy bien y es una muy buena práctica, incluso comentando se descubre que tan limpio y claro es tu código. 
- Si debes describir casi toda la función de que procesos realiza, algunos porque de x cosa y aun así leyendo el comentario, nombre de función y nombre de variables no queda muy claro, es un indicador o alerta de que el código se encuentra con deuda técnica.

```
// Esta función se encarga de enviar un correo electrónico
```
Si debes realizar este comentario tan obvio, quiere decir que esta función hace muchas cosas que no son lo suficientemente claras para que el desarrollador interprete su funcionalidad definitiva.

- Por el contrario, si el código es bastante claro y al leer el proceso o función es como leer un libro, felicidades tienes un código limpio que casi que sobraría comentarlo.


Existen muchos comentarios bastante obvios que deberían omitirse, si el código es lo bastante claro. Lo que se debe documentar es *por qué se tomó este camino a la solución de dicho proceso y no el otro*, *porque se decidió usar esta librería y no la otra.* Esa documentación es clave para un desarrollador que llega a conocer el proyecto por primera vez.

Comentar cuando usamos librerías de terceros, APIS, frameworks, etc. Nos encontraremos ante situaciones en las que escribir un comentario será mejor que dejar una solución compleja o un hack sin explicación.

*Los comentarios deberían ser la excepción, no la regla.*

> “No comentes el código mal escrito, reescribelo”  -Brian W. Kernoghhan
