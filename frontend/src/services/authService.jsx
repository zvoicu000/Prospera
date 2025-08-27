import axios from 'axios'

export const registerUser = async (userData) => {
    try{
        const response = await axios.post('http://localhost:3000/api/auth/register', userData)
        const {token} = response.data
        if(token){
            localStorage.setItem('jwt', token)
            axios.defaults.headers.common['Authorization']=`Bearer ${token}`
        }
        return response.data
    }catch(error) {
        console.error('Error in registerUser:', error.response ? error.response.data : error.message)
        throw error
    }
}

export const loginUser = async ( userData) => {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login',userData)
        const {token} = response.data
        if(token){
            localStorage.setItem('jwt', token)
            axios.defaults.headers.common['Authorization']=`Bearer ${token}`
        }
        return response.data
    }catch(error){
        console.error('Error in loginUser:', error.response ? error.response.data : error.message)
       throw error
    }
}