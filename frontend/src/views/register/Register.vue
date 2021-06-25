<template>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    <h1 class="mt-4 mb-3">{{ heading }}</h1>
    <router-link to="/" custom>
      <b-button variant="primary" class="mb-5"
        ><b-icon icon="arrow-left" class="me-2"></b-icon>Voltar</b-button
      >
    </router-link>
    <b-form-group
      class="mb-3"
      id="input-group-1"
      label="Nome:"
      label-for="input-1"
    >
      <b-form-input
        id="input-1"
        v-model="form.name"
        placeholder="Entre nome"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      class="mb-3"
      id="input-group-1"
      label="Username:"
      label-for="input-1"
    >
      <b-form-input
        id="input-1"
        v-model="form.username"
        placeholder="Entre username"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      class="mb-3"
      id="input-group-1"
      label="Senha"
      label-for="input-1"
    >
      <b-form-input
        id="input-1"
        v-model="form.password"
        placeholder="Entrar senha"
      ></b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</template>

<script>
import {
  AUTH_REGISTER,
} from "../../store/auth/auth.constant";
import { mapGetters } from "vuex";

export default {
  name: "app-add-task",
  data() {
    return {
      heading: "Novo utilizador",
      form: {
        name: "",
        username: "",
        password: "",
      },
      show: true,
    };
  },
  computed: {
    ...mapGetters("auth", ["getMessage"])
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$store
          .dispatch(`auth/${AUTH_REGISTER}`, this.form)
          .then(() => {
            this.$alert(this.getMessage, "Registo", "success");
            this.$router.push({ name: "/" });
          })
          .catch(err => {
            this.$alert(err.message, "Erro", "error");
          });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.name = ""
      this.form.username = "";
      this.form.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
