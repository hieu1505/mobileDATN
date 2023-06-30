import http from "./http";
const accountApi={
    getaccountById(id,config){
        return http.get(`/account/${id}`, config)
    },
    updateprofile(id,data,config){
        return http.post(`/account/profile/${id}`,data, config)
    },
    changepassword(id,data,config){
        return http.post(`/account/password/${id}`,data, config)
    },
    resetpassword(data){
        return http.post(`/account/resetpw`,data)
    }

}
export default accountApi