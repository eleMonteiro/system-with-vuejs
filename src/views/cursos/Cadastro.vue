<template>
  <v-card-widget enableActions :title="'Cadastro Curso'">
    <div slot="widget-header-action"></div>
    <div slot="widget-content">
      <template>
        <v-form @submit.prevent="onSubmit" ref="form" lazy-validation v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="curso.nome"
                  label="Nome"
                  required
                  :rules="requiredRule"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field 
                  v-model="curso.sigla" 
                  label="Sigla" 
                  required 
                  :rules="requiredRule"
                ></v-text-field>
              </v-col>
              <v-col class="d-flex" cols="12" md="4">
                <v-select 
                  v-model="curso.turno"
                  :items="turnos" 
                  label="Turnos" 
                  dense></v-select>
              </v-col>
            </v-row>
            <v-row>
              <div class="my-2">
                <v-btn color="primary" type="submit" :loading="loading" large>Cadastrar</v-btn>
              </div>
            </v-row>
          </v-container>
        </v-form>
      </template>
    </div>
  </v-card-widget>
</template>
    
<script>
import VCardWidget from "@/components/VWidget";
import {createNamespacedHelpers} from 'vuex'
const {mapState, mapGetters, mapActions} = createNamespacedHelpers('curso')

export default {
  name: "Cadastro",
  components: {
    VCardWidget
  },

  data: () => ({
    valid: true,
    loading: false,
    error: "",
    requiredRule: [v => !!v || "Campo obrigatório"],
    turnos: ["Manha", "Tarde", "Noite"],
  }),

  computed: {
    ...mapState(['curso'])
  },

  methods: {
    ...mapActions(['cadastrar']),
    onSubmit() {
      this.loading = true;
      if (this.$refs.form.validate()) {
        this.cadastrar()
      }
      this.loading = false;
    }
  }
};
</script>