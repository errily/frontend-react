import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api';

class InventoryDataService {

    getAll(){
        return axios.get(API_URL+"/inventory" , {headers : authHeader()});
    }

    getPublished(){
        return axios.get(API_URL+"/inventory/published" );
    }

    get(id){
        return axios.get(`${API_URL}/inventory/${id}`, {headers : authHeader()});
    }

    getUser(id){
        return axios.get(`${API_URL}/inventory/user/${id}`, {headers : authHeader()});
    }

    create(data){
      //  console.log(axios.post(API_URL+"/inventory",data ,{headers : authHeader()}));
        return axios.post(`${API_URL}/inventory`,data ,{headers : authHeader()});
    }

    update(id, data){
        return axios.put(`${API_URL}/inventory/${id}`, data, {headers : authHeader()});
    }

    delete(id) {
        //console.log(axios.delete(`${API_URL}/inventory/${id}`), {headers : authHeader()});
        return axios.delete(`${API_URL}/inventory/${id}`, {headers : authHeader()});
    }

    deleteUser(id) {
        //console.log(axios.delete(`${API_URL}/inventory/${id}`), {headers : authHeader()});
        return axios.delete(`${API_URL}/inventory/user/${id}`, {headers : authHeader()});
    }
    
    deleteAll() {
        return axios.delete(`${API_URL}/inventory`, {headers : authHeader()});
    }
    
    findByTitle(title) {
        return axios.get(`${API_URL}/inventory?title=${title}`, {headers : authHeader()});
    }
}

export default new InventoryDataService;