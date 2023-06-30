import http from "./http"
const centerApi={
    getallcenter(params){
        return http.get(`/center`, params)
    },
    getcenterByid(id,config){
        return http.get(`/center/${id}`, config)
    },upoload(id,data,config){
        return http.post(`/center/${id}`,data, config)
    },
    getcenteral(params){
        return http.get(`/center/al`, params)
    }
}
export default centerApi