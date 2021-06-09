import Vue from 'vue'
import Vuex from 'vuex'

import usuario from './modules/usuario'
import auth from './modules/auth'
import curso from './modules/curso'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: auth,
    user: usuario,
    curso: curso
  }
})
