<template>
  <div>
    <v-card-widget enableActions :title="'Página Inicial'">
      <div slot="widget-header-action"></div>
      <div slot="widget-content">
        <v-row>
          <v-col cols="12">
            <v-simple-table fixed-header height="350px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center">Nome</th>
                    <th class="text-center">Sigla</th>
                    <th class="text-center">Turno</th>
                    <th class="text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="curso in cursos" :key="curso.id">
                    <td class="text-left">{{ curso.nome }}</td>
                    <td class="text-left">{{ curso.sigla }}</td>
                    <td class="text-left">{{ curso.turno }}</td>
                    <td>
                      <v-btn :id="curso.id" @click="editar(curso)" fab small dark color="green">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn :id="curso.id" @click="excluir(curso.id)" fab dark small color="red">
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
import {createNamespacedHelpers} from 'vuex'
const {mapState, mapActions} = createNamespacedHelpers('curso')


export default {
  name: "homeCurso",
  components: {
    VCardWidget
  },

  created(){
    this.listar()
  },
  
  computed: {
    ...mapState(['cursos'])
  },

  methods: {
    ...mapActions(['listar','setCurso']),
    redirect() {
      this.$router.push("/cursos/cadastro").then();
    },
    excluir(id) {
      this.$store.dispatch("curso/excluir", id);
    },
    editar(curso) {
      this.setCurso(curso)
      this.$router.push("/cursos/editar");
    }
  }
};
</script>
