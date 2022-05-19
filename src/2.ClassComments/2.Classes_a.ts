(() => {
    // Aplicar el principio de responsabilidad unica
    // Priorizar la composicion frente a la herencia

    type HtmlType = 'input'|'select'|'textarea'|'radio';

    class HtmlElement {
        constructor (
            public id: string,
            public type: HtmlType,
        ) {}
    }

    
    class InputAttributes extends HtmlElement {
        constructor (
            public value: string,
            public placeholder: string,
            id: string,
        ) {
            super(id, 'input');
        }
    }

    class InputEvents extends InputAttributes {
        constructor ( value: string, placeholder: string, id: string ) {
            super(value, placeholder, id);
        }

        setFocus() {};
        getValue() {};
        isActive() {};
        removeValue() {};
    }

    // Idea para la nueva clase InputElement
    const nameField = new InputEvents('Yeison', 'Enter first name', 'txtName');

    console.log({ nameField });

})();