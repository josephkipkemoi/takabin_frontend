import Axios from "axios";
import config from '../config.json'

const axios = Axios.create({
    baseURL: `${ (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 
              config.BACKEND_PRODUCTION_URL : 
              "http:localhost:8000/"}`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    // withCredentials: true
})

export default axios