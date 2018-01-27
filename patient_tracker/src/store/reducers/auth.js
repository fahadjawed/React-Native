import Action from '../actions/actions'
const initital = {
    signin:false,
    signup:false,
    user:null,
    error:null

}

function auth(state = initital,action){

    switch(action.type){
        case Action.signin:
        return Object.assign({},state,{signin:true,signup:true,user:action.data,error:null})
        case Action.signup:
        return Object.assign({},state,{signin:true,signup:true,user:action.data,error:null})
        case Action.signout:
        return Object.assign({},state,{signin:false,signup:false,user:null,error:null})
        case Action.error:
        return Object.assign({},state,{error:action.error,signin:false,signup:false,user:null})
    
        default:
        return state
    }


}


export default auth