import { url } from "./consts";
import axios from "axios";

export function getUser (data){
    return axios.get(url+"api/User/"+data)
}