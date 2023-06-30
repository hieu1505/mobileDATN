import http from "./http";
const activityApi={
    getAllactivity(id,config){
        return http.get(`/activity/center/${id}`,config)
    },
    getActivityByid(id,config)
    {
        return http.get(`/activity/${id}`,config)
    },
    getactivity(config){
        return http.get(`/activity`,config)
    },
}
export default activityApi