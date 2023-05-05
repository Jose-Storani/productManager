export default class CustomError{
    static createError({name="Error",cause,message,code=1}){
        const newError = new Error(message,{cause})
        newError.name = name;
        newError.code = code;
        throw newError
    }
}