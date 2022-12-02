import { url , deployURL } from "./consts";
import axios from "axios";

export function postUser(data) {
    return axios.post(url+"api/User/postUser",data)
}

export function getbearer (data){
    return axios.post(url+"api/User/BearerToken",data)
}

export function getUser (data){
    return axios.get(url+"api/User/"+data)
}
export function G(value){
    return localStorage.getItem(value);
}
export function S(value,key){
    localStorage.setItem(key,value);
}

export function getBearerToken(email="w@w.w",password="1234567"){
return axios.post(url+"api/User/BearerToken",{email:email,password:password})
}
export function getRestaurant (data){
    return axios.get(url+"api/Restaurant/"+data)
}

export function getMenu (data){
    return axios.get(url+"api/Restaurant/GetRestaurantMenu/"+data)
}

export function postCategory(data) {
    return axios.post(url+"api/Categories",data)
}

export function postFood(data) {
    return axios.post(url+"api/Food",data)
}

export function putFood(data) {
    return axios.put(url+"api/Food",data)
}