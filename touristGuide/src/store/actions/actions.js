export default class Action {
    static signin  = "SIGNIN";
    static signup = "SIGNUP"
    static region = "REGION"
    static location= "LOCATION"
    static nearby = "NEARBY"
    static empty = "EMPTY"
    static signout = "SIGNOUT"

    static Signin (data){
return {
    type:this.signin,
    data:data
}
    }
    static Signup (data){
        return {
            type:this.signup,
            data:data
        }
            }
            static Signout(){
                return{
                    type:this.signout
                }
            }
            static Region(region){
                return{
                    type:this.region,
                    region:region
                }
            }
            static Marker(location){
                return{
                    type:this.marker,
                    location:location
                }
            }
            static Nearby(details){
                return{
                    type:this.nearby,
                    details:details
                }
            }
            static Empty(){
                return{
                    type:this.empty
                }
            }


}