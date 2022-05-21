# STUPID – Code Smells.

## STUPID

### Acrónimo STUPID:
Se aclara que estos son principios y no son reglas, simplemente deberían evitarse en lo posible.

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

