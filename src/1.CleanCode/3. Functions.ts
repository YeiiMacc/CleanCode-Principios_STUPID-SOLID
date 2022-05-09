(() => {

    // función para obtener información de una película por Id
    function getAllMovies(movieId: string) {
        console.log({ movieId });
    }

    //  ++
    function getMovieById(movieId: string) {
        console.log({ movieId });
    }


    // función para obtener información de los actores de una película - Actors o Cast // id = movieId getMovieCast
    function getAllMovieActors(id: string) {
        console.log({ id });
    }

    // ++
    function getMovieCastById(id: string) {
        console.log({ id });
    }


    // funcion para obtener el bio del actor por el id
    function getUsuario(ActorId: string) {
        console.log({ ActorId });
    }

    // ++
    function getActorBioById(id: string) {
        console.log({ id });
    }


    // Crear una película
    function movie(title: string, description: string, rating: number, cast: string[]) {
        console.log({ title, description, rating, cast });
    }

    // ++
    interface Movie {
        cast: string[];
        description: string;
        rating: number;
        title: string;
    }
    function createMovie({ title, description, rating, cast }: Movie) {
        console.log({ title, description, rating, cast });
    }


    // Crea un nuevo actor
    function createActorIfActorNotExists(fullName: string, birthdate: Date): boolean {

        // tarea asincrona para verificar nombre
        // ..
        if (fullName === 'yeiimacc') return false;

        console.log('Crear actor');
        return true;
    }

    // ++
    function createActor(fullName: string, birthDate: Date): boolean {

        // tarea asincrona para verificar nombre
        // ..
        if (fullName === 'yeiimacc') return false;

        console.log('Crear actor', birthDate);
        return true;
    }




})();