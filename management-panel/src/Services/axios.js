import { url } from "./consts";
import axios from "axios";

export function getUser (data){
    const config = {
        headers: { Authorization: `Bearer ${G("token")}` }
    };
    return axios.get(url+"api/User/GetUserData",config)
}

export function G(key){
    return localStorage.getItem(key);
}
export function S(value,key){
    localStorage.setItem(key,value);
}

export function getBearerToken(email="w@w.w",password="1234567"){
    return axios.post(url+"api/User/BearerToken",{email:email,password:password})
}