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