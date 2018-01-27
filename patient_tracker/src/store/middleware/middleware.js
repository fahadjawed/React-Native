
import Action from '../actions/actions'
import axios from "axios"
import AsyncStorage from "react-native"


export default class Middleware {
    static signin(data) {
        return (dispatch) => {
            axios.post('https://patient-tracker-server.herokuapp.com/user/signin', { email: data.email, password: data.password }).then(async (res) => {

                if (res.data.error) {
                    dispatch(Action.Error(res.data.error))
                }
                else {
                    dispatch(Action.Signin(res.data.user))




                }
            }).catch((error) => {
                alert(error.message)
            })

        }
    }
    static signup(data) {
        return (dispatch) => {
            axios.post("https://patient-tracker-server.herokuapp.com/user/signup", { name: data.name, email: data.email, password: data.password }).then((res) => {
                if (res.data.error) {
                    dispatch(Action.Error(res.data.error))
                }
                else {
                    dispatch(Action.Signup(res.data.user))
                }
            })
        }
    }
    static signout() {
        return (dispatch) => {
            AsyncStorage.removerItem('@user:key')
            dispatch(Action.Signout())
        }
    }
    static post(state) {
        return (dispatch) => {
            axios.post("https://patient-tracker-server.herokuapp.com/patient/add", { name: state.name, contact: state.contact, disease: state.disease, treatment: state.treatment, gender: state.selected1, docid: state.id, date: state.date }).then((res) => {
                if (res.data.error) {
                    dispatch(Action.Posterror(res.data.error))
                }
                else {
                    dispatch(Action.Post(res.data.data))
                }

            })
        }
    }
    static get(id) {

        return (dispatch) => {
            axios.get("https://patient-tracker-server.herokuapp.com/patient/all", { headers: { docid: id } }).then((res) => {

                if (res.data.error) {

                }
                else {
                    dispatch(Action.Get(res.data.data))
                }

            })
        }
    }


}
