/*eslint-disable*/

import axios from 'axios';

let util = {

};

let env = 'development';

const ajaxUrl = env === 'development' ?
    '/api' :
    env === 'production' ?
    '/api' :
    '/api';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    withCredentials:true,
    timeout: 30000
});

util.aliyunoss = axios.create({
    baseURL: '',
    withCredentials:true,
    timeout: 30000
});

util.threeJsUrl = "http://192.168.3.163:8080/fzkb/";

export default util;
