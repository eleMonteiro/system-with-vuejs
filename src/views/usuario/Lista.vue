<template>
  <div>
    <v-card-widget enableActions :title="'Página Inicial'">
      <div slot="widget-header-action"></div>
      <div slot="widget-content">
        <v-row>
          <v-col cols="12">
            <v-simple-table class="elevation" fixed-header height="350px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center">Nome</th>
                    <th class="text-center">Email</th>
                    <th class="text-center">Ativo</th>
                    <th class="text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="usuario in usuarios" :key="usuario.id">
                    <td class="text-left">{{ usuario.nome }}</td>
                    <td class="text-left">{{ usuario.email }}</td>
                    <td class="text-left">{{ usuario.habilitado }}</td>
                    <td>
                      <v-btn :id="usuario.id" @click="editar(usuario)" fab small dark color="green">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn :id="usuario.id" @click="excluir(usuario.id)" fab dark small color="red">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </div>
    </v-card-widget>
    <v-card-text style="height: 100px; position: relative">
      <v-fab-transition>
        <v-btn color="blue" @click="redirect()" absolute top right fab dark>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-text>
  </div>
</template>

<script>
// @ is an alias to /src
import VCardWidget from "@/components/VWidget";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import user from "../../store/modules/usuario";

const usuarioRepo = RepositoryFactory.get("usuario");

export default {
  name: "homeUsuario",
  components: {
    VCardWidget
  },

  data: () => ({
    usuarios: []
  }),
  
  computed: {
    
  },

  mounted() {
        usuarioRepo.getAll()
        .then(res => {
          this.usuarios = res.data;
        })  

  },

  methods: {
    redirect() {
      this.$router.push("/usuarios/cadastro");
    },
    excluir(id) {
      this.$store.dispatch("user/excluir", id);
      this.usuarios.splice(id,id)
    },
    editar(usuario) {
      this.$store.commit('user/setUsuario', usuario)
      this.$router.push("/usuarios/editar")
    }
  }
};
</script>
