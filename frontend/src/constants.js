import axios from "axios"

export const facebookAppId = "";
export const apiURL = "http://localhost:3003";
export const instance = axios.create({
    baseURL: apiURL,
    withCredentials: "include"
});


export const prioritets = [{
    name: "Критично",
    value: "Критично"
},
{
    name: "Стандартный",
    value: "Стандартный"
}, {

    name: "Средний",
    value: "Средний"
},
{
    name: "Высокий",
    value: "Высокий"
}]