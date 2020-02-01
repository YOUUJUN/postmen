import axios from 'axios'

let $axios = axios.create({
    baseURL : "http://localhost:3000"
});

export default $axios;