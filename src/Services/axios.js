import { url } from "./consts";
import axios from "axios";

// export function getRestaurantCards (tag, number){
//     return axios.get(url+"api/Restaurant?tag="+tag+"&size=10&number="+number)
// }

export function getRestaurantCards (){
    return axios.get(url+"api/Restaurant?tag=all&size=10&number=0")
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

export function putUser(data) {
    const config = {
        headers: { Authorization: `Bearer ${G("token")}` }
    };
    return axios.put(url+"api/User",data,config)
}

export function postRestaurant (data) {
    const config = {
        headers: { Authorization: `Bearer ${G("token")}` }
    };
    return axios.post(url+'api/Restaurant',data,config)

}


export function getTableRestaurant (id) {
    return axios.get(url+'api/Table/by restaurant?restaurantid='+id)
}

export function addTable (data) {
    /*const config = {
        headers: { Authorization: `Bearer ${G("token")}` }
    };*/
    return axios.post(url+'api/Table', data /*, config*/)
}

export function deleteTable (id) {
    /*const config = {
        headers: { Authorization: `Bearer ${G("token")}` }
    };*/
    return axios.delete(url+'api/Table/'+ id /*, config*/)
}

export function getProfit (data){
    const config = {
        headers: { Authorization: `Bearer ${G("token")}` }
    };
    return axios.get(url+"api/Managment/GetProfit/"+data,config)
}

export function getBusiestTime (data){
    const config = {
        headers: { Authorization: `Bearer ${G("token")}` }
    };
    return axios.get(url+"api/Managment/GetBusyHours?restaurantId="+data,config)
}

export function getFoodSell(data){
    const config = {
        headers: { Authorization: `Bearer ${G("token")}` }
    };
    return axios.get(url+"api/Managment/GetFoodSellByFoods?restaurantId="+data+"&from=1944-07-30T07:17:10.934Z&to=2030-07-30T07:17:10.934Z",config)
}

export function getDailySaleChart(data){
    const config = {
        headers: { Authorization: `Bearer ${G("token")}` }
    };
    return axios.get(url+"api/Managment/GetFoodSellChartDataDay/"+data,config)
}

export function getWeeklySaleChart(data){
    const config = {
        headers: { Authorization: `Bearer ${G("token")}` }
    };
    return axios.get(url+"api/Managment/GetFoodSellChartDataWeek/"+data,config)
}

export function getMonthlySaleChart(data){
    const config = {
        headers: { Authorization: `Bearer ${G("token")}` }
    };
    return axios.get(url+"api/Managment/GetFoodSellChartDataMonth/"+data,config)
}
export function getRestaurantOrders(from, to, stat, id){
    const config = {
        headers: { Authorization: `Bearer ${G("token")}` }
    };
    return axios.get(url+'api/Managment/getOrdersByStatus?From='+from+'&To='+to+'&stat='+stat+'&restaurantid='+id, config)
}

export function setStetusOrder(stat, id) {
    return axios.put(url+'api/Order/changeByStatus?status='+stat+'&orderid='+id)
}

export function setToFinishOrder(id) {
    return axios.put(url+'api/Order/ChangeOrdertoFinishedByOrderId?orderid='+id)
}

export function setDelivaryTime(id, time){
    const config = {
        headers: { Authorization: `Bearer ${G("token")}` }
    };
    return axios.put(url+'api/Order/SetDelivaryTime?id='+id+'&delivary='+time, config)
}

export function getPollResult(id){
    return axios.get(url+'api/Poll/result?restaurantid='+id)
}

export function getInventory(data){
    return axios.get(url+'api/Inventory/Get/'+data)
}

export function addToInventory(data){
    // const config = {
    //     headers: { Authorization: `Bearer ${G("token")}` }
    // };
    return axios.post(url+'api/Inventory',data /*config*/)
}

export function deleteFromInventory(id){
    // const config = {
    //     headers: { Authorization: `Bearer ${G("token")}` }
    // };
    return axios.delete(url+'api/Inventory/'+id /*config*/)
}

export function getDailyOrders (id){
    const config = {
        headers: { Authorization: `Bearer ${G("token")}` }
    };
    return axios.get(url+"api/Order/TotalNumberOfToday?restaurantid="+id,config)
}

export function getMonthlyOrders (id){
    const config = {
        headers: { Authorization: `Bearer ${G("token")}` }
    };
    return axios.get(url+"api/Order/TotalNumberOfmonth?restaurantid="+id,config)
}

export function getYearlyOrders (id){
    const config = {
        headers: { Authorization: `Bearer ${G("token")}` }
    };
    return axios.get(url+"api/Order/TotalNumberOfyear?restaurantid="+id,config)
}

export function getRankTable(data){
    const config = {
        headers: { Authorization: `Bearer ${G("token")}` }
    };
    return axios.get(url+"api/Table/tablerank?restaurantid="+data,config)
}