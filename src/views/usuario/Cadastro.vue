<template>
  <v-card-widget enableActions :title="'Cadastro Usuário'">
    <div slot="widget-header-action"></div>
    <div slot="widget-content">
      <template>
        <v-form @submit.prevent="onSubmit" ref="form" lazy-validation v-model="valid">
          <v-container>
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
                <v-text-field v-model="usuario.email" label="E-mail" required :rules="emailRules"></v-text-field>
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
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="usuario.curso.id"
                  label="Curso"
                  required
                  :rules="requiredRule"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-checkbox
                  v-model="usuario.habilitado"
                  :label="`Habilitar`"
                  value="true"
                ></v-checkbox>
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
    emailRules: [
      v => v => !!v || "Campo obrigatório",
      v => /.+@.+\..+/.test(v) || "E-mail inválido"
    ],
    usuario: { nome: "", email: "", password: "", habilitado: "", curso: { id: "" } }
  }),

  computed: {},

  methods: {
    onSubmit() {
      this.loading = true;

      if (this.$refs.form.validate()) {
        this.$store.dispatch("user/cadastrar", this.usuario).then(() => {
          this.$router.push("/usuarios/listar");
        });
      }

      this.loading = false;
    }
  }
};
</script>