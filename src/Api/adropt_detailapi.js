import http from "./http";

const adropt_detailAPi = {
    getadropt_detailbyacountid(id, config) {
        return http.get(`/adropt_detail/acount/${id}`, config)
    },
    createadropt_detail(data,config){
        return http.post('/adropt_detail', data, config)
    },updateadropt_detail(id,data,config){
        return http.put(`/adropt_detail/${id}`, data, config)
    }


   
}
export default adropt_detailAPi