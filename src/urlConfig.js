import axios from "axios";

// const auth = localStorage.getItem("auth") 
// const token = auth? JSON.parse(auth).token : null

// console.log(auth)

export const axiosInstance = axios.create({
    baseURL:"http://127.0.0.1:8000/api",
    // headers:{Authorization : `Bearer ${token}`}
})




