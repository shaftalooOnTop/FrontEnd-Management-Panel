import { url } from "./consts";
import axios from "axios";

export function postUser(data) {
    return axios.post(url+"api/User",data)
}

export function getbearer (data){
    return axios.post(url+"api/User/BearerToken",data)
}

export function getRestaurantCards (tag, number){
    return axios.get(url+"api/Restaurant?tag="+tag+"&size=10&number="+number)
}

export function G(key){
    return localStorage.getItem(key);
}
export function S(key,value){
    localStorage.setItem(key,value);
}
