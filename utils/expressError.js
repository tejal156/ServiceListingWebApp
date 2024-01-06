
class CustomizeExpression1 extends Error
{
    constructor( statusCode1 , message1 )
    {
        super() ;
        this.statusCode = statusCode1 ;
        this.message = message1 ;
    }

}

module.exports = CustomizeExpression1 ;