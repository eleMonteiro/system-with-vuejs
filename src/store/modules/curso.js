import axios from 'axios'
import auth from './auth';
import { RepositoryFactory } from "../../repositories/RepositoryFactory";

const cursoRepository = RepositoryFactory.get("curso");

// state
const state = {
    curso: { id: 0, nome: "", sigla: "", turno: "" },
    cursos: []
};

// actions
const actions = {
    async cadastrar({state, commit}) {
        try{
            const res = await axios.post(
                'cursos/cadastar', 
                state.curso, 
                { headers: {
                     Authorization:
                      auth.state.token }})
            commit('clean')
        } catch( errs ){
            console.log(errs)
        }
    },
    editar({ commit, dispatch }) {
        axios.put(`cursos/editar/${cursoData.id}`, {
            id: cursoData.id,
            nome: cursoData.nome,
            sigla: cursoData.sigla,
            turno: cursoData.turno
        }, { headers: { Authorization: auth.state.token } })
            .catch(error => console.log(error))
            .finally(() => resolve())
    },
    excluir({ commit, dispatch }, id) {
        axios.delete(`cursos/deletar/${id}`, { headers: { Authorization: auth.state.token } })
            .catch(error => console.log(error))
            .finally(() => resolve())
    },
    async listar({state, commit}){
        const res = await cursoRepository.getAll()
        console.log(res.data)
        commit('setCursos', res.data)       
    },
    setCurso({commit}, curso){
        commit('setCurso', curso)
    }
};

// getters
const getters = {
    getCurso(state) {
        return state.curso
    }
};

// mutations
const mutations = {
    setCurso(state, curso) {
        state.curso = curso
    },
    setCursos(state, payload){
        state.cursos = payload
    },
    clean(state){
        state.curso.nome = ''
        state.curso.sigla = ''
        state.curso.turno = ''
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}