import http from "./http";
const childrenApi={
    getallChildren(params){
        return http.get(`/children`, params)
    },
    getchildrenbyid(id,config){
        return http.get(`/children/${id}`,config)
    },
    getallchildrentbycenter(id,data){
        return http.get(`/children/center/${id}`,data)
    },
}
export default childrenApi