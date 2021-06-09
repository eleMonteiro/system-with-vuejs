import axios from 'axios'
import auth from './auth'

// state
const state = {
    usuario: '',
    usuarios: []
};

// actions
const actions = {
    cadastrar({ commit, dispatch }, userData) {
        axios.post('usuarios/cadastrar',{ 
                nome: userData.nome, 
                email: userData.email, 
                password: userData.password,
                habilitado: userData.habilitado, 
                curso: userData.curso
                }, { headers: {Authorization: auth.state.token }})
             .catch(error => console.log(error))
             .finally(() => resolve())
    },
    editar({ commit, dispatch }, userData) {
        axios.put(`usuarios/${userData.id}`, {
                id: userData.id,
                nome: userData.nome, 
                email: userData.email, 
                password: userData.password,
                habilitado: userData.habilitado
            }, { headers: {Authorization: auth.state.token }})
             .catch(error => console.log(error))
             .finally(() => resolve())
    },
    excluir({commit, dispatch}, id){
        axios.delete(`usuarios/${id}`,{headers: {Authorization: auth.state.token }})
         .catch(error => console.log(error))
         .finally(() => resolve())
    }
};

// getters
const getters = {
    getUsuario(state){
        return state.usuario
    }
};

// mutations
const mutations = {
    setUsuarios(state, usuario){
        state.usuario = usuario
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}