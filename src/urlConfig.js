import axios from "axios";

// const auth = localStorage.getItem("auth") 
// const token = auth? JSON.parse(auth).token : null

// console.log(auth)

export const axiosInstance = axios.create({
    baseURL:"http://128.199.201.43/api",
    // headers:{Authorization : `Bearer ${token}`}
})




