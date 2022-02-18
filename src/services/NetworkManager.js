import axios from 'axios';

export const serverUrl = process.env.VUE_APP_SERVER_URL + process.env.VUE_APP_API_PORT;
export const socketUrl = process.env.VUE_APP_SERVER_URL + process.env.VUE_APP_SOCKET_PORT;

export default {
  getRequest: async (apiName, data) => {
    const res = await axios.get(serverUrl + apiName, { params: data });
    // window.console.log(res.data);
    return res.data;
  },

  postRequest: async (apiName, data) => {
    const res = await axios.post(serverUrl + apiName, data);
    console.log('post request');
    // window.console.log(res.data)
    return res.data;
  },

  putRequest: async (apiName, data) => {
    const res = await axios.put(serverUrl + apiName, data);
    // window.console.log(res.data)
    return res.data;
  },

  deleteRequest: async (apiName, data) => {
    const res = await axios.delete(serverUrl + apiName, { params: data });
    // window.console.log(res.data)
    return res;
  },

  downloadFile: async (apiName, data) => {
    const res = await axios.post(serverUrl + apiName, data, { responseType: 'arraybuffer' });
    window.console.log(res.data);
    return res;
  },

};
