import axios from 'axios';

//https://sujeitoprogramador.com/r-api/?api=filmes
const BASE_URL = 'https://sujeitoprogramador.com'

const api = axios.create({
    baseURL: BASE_URL
})

export default api;