import http from "./http";
const likeapi={
    checklike(data,config){
        return http.post(`/like/check/`,data,config)
    },
    postlike(data,config){
        return http.post(`/like`,data,config)
    }, postdistlike(data,config){
        return http.post(`/like/dislike`,data,config)
    }
    }
export default likeapi