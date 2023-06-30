import http from "./http";

const adropt_requestApi = {
    checkadropt_requesbychildrentid(id, config) {
        return http.get(`/adropt_request/${id}`, config)
    },
    creatadropt_request(data,config){
        return http.post('/adropt_request', data, config)
    },
    Deleteadropt_reques(id,config){
        return http.delete(`/adropt_request/${id}`, { id: id }, config)
    },
    getlistadropt_requesbyaccount(id,config){
        return http.get(`/adropt_request/account/${id}`, config)
    }

   
}
export default adropt_requestApi