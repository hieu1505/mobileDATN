import axios from "axios";
function getlatlong(address){
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;
    axios.get(url)
  .then(response => {
   
 console.log(response.data[0])
  })
  .catch(error => {
    console.error(error);
  });
}
export default getlatlong