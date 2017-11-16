import JwtToken from "./jwt-token";
import LocalStorage from './localStorage';
import {User} from "./resources";

const USER = 'user';

const afterLogin = function(response){
    this.user.check = true;
    User.get()
        .then((response) => {
            this.user.data = response.data;
        });
}
export default {
    user : {
        set data(value){
            if(!value){
                LocalStorage.remove(USER);
                this._data = null;
                return;
            }

            this._data = value;
            LocalStorage.setObject(User,value);
        },
        get data(){
            if(this._data){
                this._data = LocalStorage.getObject(User);
            }
            return this._data;
        },
        check: JwtToken.token ? true : false
    },
    login(email, password){
        return JwtToken.accessToken(email, password)
            .then((response)=>{
                let afeterLoginContext = afterLogin.bind(this);
                afeterLoginContext(response);
                return response;
        });
    },
    logout(){
        let afterLogout = () => {
            this.clearAuth();
        }

        return JwtToken.revokeToken()
            .then(afterLogout())
            .catch(afterLogout());
    },
    clearAuth(){
        this.user.date = null;
        this.user.check = false;
    }
}