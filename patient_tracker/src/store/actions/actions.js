export default class Action {

static signin  = "SIGNIN"
static signup = "SIGNUP"
static error = "ERROR"
static get = "GET"
static post ="POST"
static posterror = "POSTERROR"
static signout = "SIGNOUT"
static Get(data){
    return{
        type:this.get,
        data:data
    }
}
static Post(data){
    return{
    type:this.post,
    data:data
    }
}
static Posterror(error){
    return{
        type:this.posterror,
        error:error
    }
}
static Signin (data){
    return{
    type:this.signin,
    data:data
    }
}
static Signup (data){
    return{
        type:this.signup,
        data:data
    }
}
static Error(error){
    return{
        type:this.error,
        error:error
    }
}
static Signout(){
    return{
        type:this.signout
    }
}
}