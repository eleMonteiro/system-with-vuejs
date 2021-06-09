import Repository from "./Repository";

const resource = "/cursos";

export default {
  
    getByAutenticacao() {
        return Repository.get(`${resource}/usuario`);
    },

    getAll() {
      return Repository.get(`${resource}`)
    }
}
