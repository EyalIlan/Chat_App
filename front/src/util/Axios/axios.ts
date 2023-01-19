import Axios from 'axios'


const instance = Axios.create({
    baseURL: 'https://chat1-lyze.onrender.com',
});

export default instance