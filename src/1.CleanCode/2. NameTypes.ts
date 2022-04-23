(() => {

    // arreglo de temperaturas en grados celsius
    const arrayOfNums = [33.6, 12.34];
    const temperaturesCelsius = [33.6, 12.34]; // mejor +++

    // Dirección ip del servidor
    const ip = '123.123.123.123';
    const serverIp = '123.123.123.123'; // mejor +++

    // Listado de usuarios
    const people = [
        {
            id: 1,
            email: 'fernando@google.com'
        },
        {
            id: 2,
            email: 'juan@google.com'
        },
        {
            id: 3,
            email: 'melissa@google.com'
        }
    ];
    // Listado de emails de los usuarios
    const emails = people.map(u => u.email);

    const userList = [  // mejor +++
        {
            id: 1,
            email: 'fernando@google.com'
        },
        {
            id: 2,
            email: 'juan@google.com'
        },
        {
            id: 3,
            email: 'melissa@google.com'
        }
    ];
    const userEmails = userList.map(user => user.email);  // mejor +++

    // Variables booleanas de un video juego
    const jump = false;
    const run = true;
    const noTieneItems = true;
    const loading = false;

    // mejor +++
    const canJump = false;
    const canRun = true;
    const hasItems = false;
    const isLoading = false;



    // tiempo inicial
    const start = new Date().getTime();
    // Tiempo al final
    const end = new Date().getTime() - start;

    // mejor +++
    const startTime = new Date().getTime();
    const endTime = new Date().getTime() - startTime;


    // Funciones
    // Obtiene los libros
    function book() {
        throw new Error('Function not implemented.');
    }

    function getBooks() { // mejor +++
        throw new Error('Function not implemented.');
    }


    // obtiene libros desde un URL
    function BooksUrl(u: string) {
        throw new Error('Function not implemented.');
    }

    function getBooksByUrl(url: string) {  // mejor +++
        throw new Error('Function not implemented.');
    }


    // obtiene el área de un cuadrado basado en sus lados
    function areaCuadrado(s: number) {
        throw new Error('Function not implemented.');
    }

    function getSquareArea(side: number) {  // mejor +++
        throw new Error('Function not implemented.');
    }

    // imprime el trabajo
    function printJobIfJobIsActive() {
        throw new Error('Function not implemented.');
    }

    function printJob() {  // mejor +++
        throw new Error('Function not implemented.');
    }


})();