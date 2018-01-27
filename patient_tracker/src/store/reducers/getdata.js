import Action from '../actions/actions'
const initital = {
    get:null,
    post:null,
    error:null

}

function get(state = initital,action){

    switch(action.type){
        case Action.get:
        return Object.assign({},state,{get:action.data,post:null,error:null})
        case Action.post:
        return Object.assign({},state,{post:action.data,error:null})
        case Action.posterror:
        return Object.assign({},state,{error:action.error,get:null,post:null})
        default:
        return state
    }


}


export default get