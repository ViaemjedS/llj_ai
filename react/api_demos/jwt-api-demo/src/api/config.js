// 标准http请求库，vue/react 都用它
import axios from 'axios';
// axios.defaults.baseURL = 'http://localhost:5173'
// mock 地址
// 现上的地址有了
axios.defaults.baseURL = 'http://localhost:5173'
// axios.defaults.baseURL = 'https://api.github.com/users/ViaemJedS'
export default axios;