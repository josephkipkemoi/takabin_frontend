import axios from "../lib/Axios"

export  const  AuthUser  = async () => {
    const token = JSON.parse(localStorage.getItem('user')).authorization
    const res = await axios.get('api/user', {
        headers: {
            'authorization': `${token.type} ${token.token}`
        }
    })

    return Boolean(res?.data)
}