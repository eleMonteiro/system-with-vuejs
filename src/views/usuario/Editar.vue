<template>
  <v-card-widget enableActions :title="'Editar Usuário'">
    <div slot="widget-header-action"></div>
    <div slot="widget-content">
      <template>
        <v-form @submit.prevent="onSubmit" ref="form" lazy-validation v-model="valid">
          <v-container>
            <v-col cols="12" md="4">
              <v-text-field v-model="usuario.id" disabled></v-text-field>
            </v-col>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="usuario.nome"
                  :counter="10"
                  label="Nome"
                  required
                  :rules="requiredRule"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field v-model="usuario.email" label="E-mail" required :rules="requiredRule"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="usuario.password"
                  type="password"
                  label="Senha"
                  required
                  :rules="requiredRule"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-checkbox v-model="usuario.habilitado" :label="`Habilitar`" value="true"></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <div class="my-2">
                <v-btn color="primary" type="submit" :loading="loading" large>Editar</v-btn>
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
import { mapGetters, mapState } from "vuex";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import user from "../../store/modules/usuario";

const usuarioRepo = RepositoryFactory.get("usuario");

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
    usuario: { id: "", nome: "", email: "", password: "", habilitado: "" }
  }),

  computed: {
    ...mapGetters({
      usuarioStore: 'user/getUsuario'
    })
  },

  methods: {
    onSubmit() {
      this.loading = true;
      if (this.$refs.form.validate()) {
        this.$store.dispatch("user/editar", this.usuario).then(() => {
          this.$router.push("/usuarios/listar");
        });
      }

      this.loading = false;
    }
  },

  mounted(){
    this.usuario = this.usuarioStore
  }
};
</script>