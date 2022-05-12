class Product {

    constructor(
        public name: string = '',
        public price: number = 0,
        public size: string = '',
        public inStock: boolean = false,
    ) { }

    // No DRY - Una comparación para cada atributo
    // if (this.name.length <= 0) throw Error('name is empty');
    // if (this.price <= 0) throw Error('price is zero');
    // if (this.size.length <= 0) throw Error('size is empty');
    // if (this.inStock.length == false) throw Error('inStock is false');
    isProductReady(): boolean {
        //  Por typo nos ayuda disminuir las lineas repetidas
        // con case: 'string' evaluamos todos los string sim importar su nombre. Ejempo:
        // Nombre - Descripcion - Tamanio - etc.
        // Numeros: precio, cantidad
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

