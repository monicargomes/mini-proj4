<template>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    <h1 class="mt-4 mb-3">{{ heading }}</h1>
    <router-link to="/register" custom>
      <b-button variant="primary" class="mb-5">Novo utilizador</b-button>
    </router-link>
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
      id="input-group-2"
      label="Senha"
      label-for="input-2"
    >
      <b-form-input
        id="input-2"
        type="password"
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
  AUTH_LOGIN
} from "../../store/auth/auth.constant";
import { mapGetters } from "vuex";

export default {
  name: "app-add-task",
  data() {
    return {
      heading: "Login",
      form: {
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
        .dispatch(`auth/${AUTH_LOGIN}`, this.form)
        .then(() => {
          this.$alert(this.getMessage, "Login", "success");
          this.$router.push({ name: "overview" });
        })
        .catch(err => {
          this.$alert(`${err.message}`, "Erro", "error");
        });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
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
