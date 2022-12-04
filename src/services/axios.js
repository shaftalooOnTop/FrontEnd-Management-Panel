import { url } from "./consts";
import axios from "axios";

export function getRestaurantCards (tag, number){
    return axios.get(url+"api/Restaurant?tag="+tag+"&size=10&number="+number)
}

export function getUser (){
    const config = {
        headers: { Authorization: `Bearer ${G("token")}` }
    };
    return axios.get(url+"api/User/GetUserData",config)
}

export function postUser(data) {
    return axios.post(url+"api/User/postUser",data)
}

export function getbearer (data){
    return axios.post(url+"api/User/BearerToken",data)
}

export function G(key){
    return localStorage.getItem(key);
}
export function S(key,value){
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


export function getRestaurantCards (){
    return axios.get(url+"api/Restaurant?tag=all&size=10&number=0")
}

export function postRestaurant (data) {
    return axios.post(url+'api/Restaurant',data)
}
