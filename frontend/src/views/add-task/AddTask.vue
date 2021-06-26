<template>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    <h1 class="mt-4 mb-3">{{ heading }}</h1>
    <router-link to="/overview" custom>
      <b-button variant="primary" class="mb-5"
        ><b-icon icon="arrow-left" class="me-2"></b-icon>Voltar</b-button
      >
    </router-link>
    <b-form-group
      class="mb-3"
      id="input-group-1"
      label="Tarefa:"
      label-for="input-1"
    >
      <b-form-input
        id="input-1"
        v-model="form.description"
        placeholder="Descrição da tarefa"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      class="mb-4"
      id="input-group-2"
      label="Prazo:"
      label-for="input-2"
    >
      <b-form-datepicker
        id="input-2"
        :min="minDate"
        v-model="form.date"
        required
      ></b-form-datepicker>
    </b-form-group>

    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</template>

<script>
import {
  ADD_TASK,
  EDIT_TASK,
  FETCH_TASKS,
} from "../../store/tasks/task.constant";
import { mapGetters } from "vuex";

export default {
  name: "app-add-task",
  data() {
    return {
      heading: "Adicionar tarefa",
      minDate: new Date(),
      form: {
        description: "",
        date: "",
        complete: false,
      },
      show: true,
    };
  },
  computed: {
    ...mapGetters("task", ["getTaskById", "getMessage"]),
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      if (this.form._id) {
        this.editTask();
      } else {
        this.addTask();
      }
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.description = "";
      this.form.date = "";
      this.form.complete = false;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    addTask() {
      this.$store.dispatch(`task/${ADD_TASK}`, this.$data.form).then(
        () => {
          this.$alert(this.getMessage, "Tarefa adicionada!", "success");
          this.$router.push({ name: "overview" });
        },
        (err) => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    editTask() {
      this.$store.dispatch(`task/${EDIT_TASK}`, this.form).then(
        () => {
          this.$router.push({ name: "overview" });
        },
        (err) => this.$alert(`${err.message}`, "Erro", "error")
      );
    },
    fetch(id) {
      this.$store.dispatch(`task/${FETCH_TASKS}`).then(
        () => {
          this.form = this.getTaskById(id);
        },
        (err) => this.$alert(`${err.message}`, "Erro", "error")
      );
    },
  },
  created() {
    const { id } = this.$route.params;
    if (id) {
      this.heading = "Editar tarefa";
      const task = this.getTaskById(id);
      if (task) {
        this.form = task;
      } else {
        this.fetch(id);
      }
    }
  },
};
</script>

<style lang="css"></style>
