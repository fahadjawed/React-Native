import Action from '../actions/actions'

const INITIAL = {
    signin:false,
    signup:false,
    user:null
}

function auth(state = INITIAL,action){
    switch (action.type){
        case Action.signin:
        return Object.assign({},state,{signin:true,signup:true,user:action.data});
        case Action.signup:
        return Object.assign({},state,{signin:true,signup:true,user:action.data});
        case Action.signout:
        return Object.assign({},state,{signin:false,signup:false,user:null})
        default :
        return state
    }

}

export default auth