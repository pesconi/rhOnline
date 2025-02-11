import axios from "axios";

//Produce
const api = axios.create({
    //baseURL: "https://api.fenix.com.br/api-site",
    baseURL: 'http://142.93.252.91:3333',
    //baseURL: "http://localhost:33509/api-rh",
});

export default api;
