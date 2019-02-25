import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-3d829.firebaseio.com/'
})

export default instance;