import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export default axios.create({
    baseURL: 'https://bulkify-back-end.vercel.app/api/v1/customers/login'
    });