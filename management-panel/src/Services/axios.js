import { url } from "./consts";
import axios from "axios";
export function setup(){
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

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
localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0YjVhZTE1Mi01ZjhjLTQyNDAtOTdkZS00NGU1NTFkNDg4NjEiLCJpYXQiOiIxMS8zMC8yMDIyIDEyOjMyOjMwIFBNIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiJiZTE0MGE0Yy0yYzExLTQ2MTctOTQ5OC1jYmJlZDIwMDBlYjkiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMWQ5MmJiMDAtZTdkZS00ZGMyLTgzYzAtZTZmZGQ4OTEwYzhiIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoid0B3LnciLCJleHAiOjE2Njk4MTM5NTAsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcwOTkiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MDk5In0.-O5GAEhlFlOc3wohHi0XRmqM11NaUyTUxNH57uLidiY")