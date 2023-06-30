import http from "./http";
const donorapi={
    postdonor(data,config){
        return http.post(`/donor/`,data,config)
    }
}
export default donorapi