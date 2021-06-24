<template>
  <div id="app-overview">
    <h1 class="mt-4 mb-3">{{ heading }}</h1>
    <router-link to="/add" custom>
      <b-button variant="primary" class="mb-5">Adicionar tarefa</b-button>
    </router-link>
    <div class="mb-4" v-for="(item, index) in items" :key="index">
      <h3 class="mb-3" >
        {{ item.date }}
        <b-icon
          v-if="item.isPast"
          icon="exclamation-circle"
          variant="danger"
          class="h5"
        ></b-icon>
      </h3>
      <b-card v-for="(task, index) in item.tasks" :key="index" class="mb-2">
        <div class="d-flex justify-content-between">
          <div>
            <b-icon
              icon="check2-square"
              variant="success"
              class="h5 mb-0 me-2 cursor-pointer"
              @click="completeTask(task)"
            ></b-icon>
            <span :class="[task.complete && 'complete']">{{
              task.description
            }}</span>
          </div>
          <div>
            <b-icon
              icon="trash"
              variant="danger"
              class="h5 mb-0 cursor-pointer"
              @click="removeTask(task._id)"
            ></b-icon>
            <b-icon
              icon="pencil"
              variant="primary"
              class="h5 mb-0 cursor-pointer"
              @click="editTask(task._id)"
            ></b-icon>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import {
  FETCH_TASKS,
  EDIT_TASK,
  REMOVE_TASK,
} from "../../store/tasks/task.constant";
import { format, formatISO, compareAsc, isPast } from "date-fns";
import { pt } from "date-fns/locale";
import { mapGetters } from "vuex";

export default {
  name: "app-overview",
  data() {
    return {
      heading: "Minhas tarefas",
      items: [],
    };
  },
  computed: {
    ...mapGetters("task", ["getTasks", "getMessage"]),
  },
  methods: {
    groupTaskbyDate(tasks) {
      const dates = [
        ...new Set(
          tasks.map((task) =>
            formatISO(new Date(task.date), { representation: "date" })
          )
        ),
      ];

      const sortedDates = dates.map((date) => new Date(date)).sort(compareAsc);

      return sortedDates.map((date) => {
        return {
          isPast: isPast(new Date(date)),
          date: format(new Date(date), "dd 'de' MMMM", { locale: pt }),
          tasks: tasks.filter(
            (task) =>
              formatISO(new Date(task.date), { representation: "date" }) ===
              formatISO(new Date(date), { representation: "date" })
          ),
        };
      });
    },
    fetchTasks() {
      this.$store.dispatch(`task/${FETCH_TASKS}`).then(
        () => {
          this.items = this.groupTaskbyDate(this.getTasks);
        },
        (err) => console.log(`${err.message}`, "Erro", "error")
      );
    },
    completeTask(task) {
      this.$store
        .dispatch(`task/${EDIT_TASK}`, { ...task, complete: !task.complete })
        .then(
          () => {
            this.fetchTasks();
          },
          (err) => console.log(`${err.message}`, "Erro", "error")
        );
    },
    removeTask(id) {
      this.$store.dispatch(`task/${REMOVE_TASK}`, id).then(
        () => {
          this.fetchTasks();
        },
        (err) => console.log(`${err.message}`, "Erro", "error")
      );
    },
    editTask(id) {
      this.$router.push({ name: "edit", params: { id } });
    },
  },
  created() {
    this.fetchTasks();
  },
};
</script>

<style lang="css">
.complete {
  text-decoration: line-through;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
