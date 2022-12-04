import { url } from "./consts";
import axios from "axios";

export function postUser(data) {
    return axios.post(url+"api/User/postUser",data)
}

export function getbearer (data){
    return axios.post(url+"api/User/BearerToken",data)
}

export function getRestaurantCards (){
    return axios.get(url+"api/Restaurant?tag=all&size=10&number=0")
}

export function getTableRestaurant (id) {
    return axios.get(url+'api/Table/by restaurant?restaurantid='+id)
}

export function addTable (data) {
    return axios.put(url+'api/Table', data)
}

export function deleteTable (id) {
    return axios.delete(url+'api/Table/:'+id)
}