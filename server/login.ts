import {read, update} from "./controllers/UserController"

const login (username: String, password: String) => {
    let user = read(username);
    if (!user) {
        return false;
    }

    if (user.password == password) {
        return true;
    }
    
}