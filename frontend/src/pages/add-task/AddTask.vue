<template>
  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
    <b-form-group class="mb-3" id="input-group-1" label="Tarefa:" label-for="input-1">
      <b-form-input
        id="input-1"
        v-model="form.description"
        placeholder="Descrição da tarefa"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group class="mb-4" id="input-group-2" label="Prazo:" label-for="input-2">
      <b-form-datepicker id="input-2" :min="minDate" v-model="form.date" required></b-form-datepicker>
    </b-form-group>

    <b-button type="submit" variant="primary">Submit</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</template>

<script>
import { ADD_TASK } from '../../store/tasks/task.constant';
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
      show: true
    };
  },
  computed: {
    ...mapGetters("task", ["getMessage"])
  },
  methods: {
      onSubmit(event) {
        event.preventDefault();
        console.log(event);
        this.$store.dispatch(`task/${ADD_TASK}`, this.$data.form).then(
        () => {
          console.log(this.getMessage, "Task adicionada!", "success");
          // router.push({ name: "listAnimals" });
        },
        err => {
          console.log(`${err.message}`, "Erro", "error");
        }
      );
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.description = ''
        this.form.date = ''
        this.form.complete = false
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
};
</script>

<style lang="css"></style>
