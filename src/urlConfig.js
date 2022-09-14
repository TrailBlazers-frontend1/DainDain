import axios from "axios";

// const auth = localStorage.getItem("auth") 
// const token = auth? JSON.parse(auth).token : null

// console.log(auth)

export const axiosInstance = axios.create({
    baseURL:"http://165.22.51.1/api",
    // headers:{Authorization : `Bearer ${token}`}
})




