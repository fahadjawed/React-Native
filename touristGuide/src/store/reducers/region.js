import Action from '../actions/actions'

const INITIAL = {
   region:null,
   nearby:null

}

function region(state = INITIAL,action){
    switch (action.type){
        case Action.region:
        return Object.assign({},state,{region:action.region});
        case Action.nearby:
        return Object.assign({},state,{nearby:action.details});
        case Action.empty:
        return Object.assign({},state,{nearby:null})
        default :
        return state
    }

}

export default region