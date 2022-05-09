(() => {
    // Menos uso de condiciones dentro de condiciones
    const PayAmount = ({ isDead = false, isSeparated = true, isRetired = false }) => {
        let result;
        if ( isDead ) {
            result = 1500;
        } else {
            if ( isSeparated ) {
                result = 2500;
            } else {
                if ( isRetired ) {
                    result = 3000;
                } else {
                    result = 4000; 
                }
            }
        }
        
        return result;
    }

    //  ++
    const getPayAmount = ({ isDead = false, isSeparated = true, isRetired = false }) => {
        if ( isDead ) return  1500;       
        if ( isSeparated ) return 2500;       
        return ( isRetired ) ? 3000 : 4000;          
    }
})();