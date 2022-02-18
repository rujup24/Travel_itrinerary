import ApiNames from './ApiNames';
import networkManager from './NetworkManager';
// export default () => axios.create({
//   baseURL: '',
//   headers: {},
// });
export default {
  pingpong: async (data) => {
    console.log(data);
    const reponse = await networkManager.getRequest(ApiNames.pingpong, data);
    return reponse;
  },
  login: async (data) => {
    console.log(data);
    const reponse = await networkManager.postRequest(ApiNames.login, data);
    return reponse;
  },
  signUp: async (data) => {
    const reponse = await networkManager.postRequest(ApiNames.signUp, data);
    return reponse;
  },
  planner: async (data) => {
    console.log(data);
    const reponse = await networkManager.getRequest(ApiNames.planner, data);
    return reponse;
  },
  iternary: async (data) => {
    console.log(data);
    const reponse = await networkManager.getRequest(ApiNames.iternary, data);
    return reponse;
  },
};
