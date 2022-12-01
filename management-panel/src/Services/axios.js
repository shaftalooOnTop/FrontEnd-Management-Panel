import { url } from "./consts";
import axios from "axios";

export function getUser (data){
    return axios.get(url+"api/User/"+data)
}
export function G(value){
    return localStorage.getItem(value);
}
export function S(value,key){
    localStorage.setItem(key,value);
}

// setup();
export function getBearerToken(email="w@w.w",password="1234567"){
return axios.post(url+"api/User/BearerToken",{email:email,password:password})
}