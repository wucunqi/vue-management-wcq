import axiosInstance from "@/utils/request";

export const getData = ()=>{
    return axiosInstance.get('/home/getData')
}
export const getMenu = (loginInfo)=>{
    return axiosInstance.post('/login',loginInfo)
}
export const getRole = ()=>{
    return axiosInstance.get("/role")
}
export const getAgency = ()=>{
    return axiosInstance.get('/agency')
}
export const addUser = (userinfo)=>{
    return axiosInstance.post("/user",userinfo)
}
export const getUser = ()=>{
    return axiosInstance.get("/users")
}
export const getUserRole = ()=>{
    return axiosInstance.get("/userrole")
}