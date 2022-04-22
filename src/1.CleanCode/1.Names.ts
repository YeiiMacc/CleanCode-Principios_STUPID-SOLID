(() => {

    // Mal -
    // Archivos a evaluar - files to evaluate
    const fs = [
        { id: 1, f: false },
        { id: 2, f: false },
        { id: 3, f: true },
        { id: 4, f: false },
        { id: 5, f: false },
        { id: 7, f: true },
    ]; 
    // Archivos marcados para borrar - files to delete
    const arhivos = fs.map( f => f.f );


    // Mejor +++ 
    // Archivos a evaluar - files to evaluate
    const filesToEvaluate = [
        { id: 1, flagged: false },
        { id: 2, flagged: false },
        { id: 3, flagged: true },
        { id: 4, flagged: false },
        { id: 5, flagged: false },
        { id: 7, flagged: true },
    ]; 
    // Archivos marcados para borrar - files to delete
    const filesToDelete = filesToEvaluate.map( file => file.flagged );




    // Mal -
    class AbstractUser { };
    class UserMixin { };
    class UserImplementation { };
    interface IUser { };

    // Mejor +++
    class User { };
    interface User { };




            
    // día de hoy - today
    const ddmmyyyy = new Date(); // mal - 
    const today = new Date(); // mejor +++
    
    // días transcurridos - elapsed time in days
    const d: number = 23; // mal -
    const elapsedTimeInDays: number = 23; // mejor +++
    
    // número de archivos en un directorio - number of files in directory
    const dir = 33; // mal -
    const number0fFilesInDirectory = 33; // mejor +++
    
    // primer nombre - first name
    const nombre = 'Yeii'; // mal -
    const firstName = 'Yeii'; // mejor +++
    
    // primer apellido - last name
    const apellido = 'Macc'; // mal -
    const lastName = 'Macc'; // mejor +++

    // días desde la última modificación - days since modification
    const dsm = 12; //mal -
    const daysSinceModification = 12; // mejor +++

    // cantidad máxima de clases por estudiante - max classes per student
    const max = 6; // mal -
    const maxClassesPerStudent = 6; //mejor +++

})();
