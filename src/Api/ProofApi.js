import http from "./http";

const ProofApi = {
    createProof(id,data,config){
        return http.post(`/proofs/${id}`,data, config)
    },
    getlistProof(id,config){
        return http.get(`/proofs/${id}`, config)
    },
    deleteProof(id,config){
        return http.delete(`/proofs/${id}`, { id: id }, config)
    },
   
}
export default ProofApi