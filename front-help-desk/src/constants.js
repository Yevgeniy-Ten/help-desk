import axios from "axios"

export const facebookAppId = "416283772962264";
export const apiURL = "http://localhost:3003";
export const instance = axios.create({
    baseURL: apiURL
});

