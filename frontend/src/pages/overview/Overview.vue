<template>
  <div id="app-overview">
    <div class="mb-4" v-for="(item, index) in items" :key="index">
      <h3 class="mb-3">{{ item.date }}</h3>
      <b-card v-for="(task, index) in item.tasks" :key="index" class="mb-2">
        <div class="d-flex justify-content-between">
          <div :class="[task.complete && 'complete']">{{task.description}}</div>
          <div>
            <b-icon icon="trash" variant="danger" class="h5 mb-0"></b-icon>
            <b-icon icon="pencil" variant="primary" class="h5 mb-0"></b-icon>
            <b-icon icon="check2-square" variant="success" class="h5 mb-0" @click="completeTask(task)"></b-icon>
          </div>
        </div>
      </b-card>
    </div>
    <div>{{selected}}</div>
  </div>


</template>

<script>
import { FETCH_TASKS, EDIT_TASK } from "../../store/tasks/task.constant";
import { format, formatISO, compareAsc } from 'date-fns';
import { pt } from 'date-fns/locale'
import { mapGetters } from "vuex";

export default {
  name: "app-overview",
  data() {
    return {
      heading: "Tarefas da semana",
      items: [],
      selected: [],
      currentDate: format(new Date(), 'dd/MMMM', {locale: pt})
    };
  },
  computed: {
    ...mapGetters("task", ["getTasks","getMessage"]),
  },
  methods: {
    groupTaskbyDate(tasks) {
      const dates = [...new Set(tasks.map(task => formatISO(new Date(task.date), {representation: 'date'})))];

      const sortedDates = dates.map(date => new Date(date)).sort(compareAsc);

      return sortedDates.map(date => {
        return {
          date: format(new Date(date), "dd 'de' MMMM", {locale: pt}),
          tasks: tasks.filter(task => formatISO(new Date(task.date), {representation: 'date'}) === formatISO(new Date(date), {representation: 'date'}))
        }
      })
    },
    fetchTasks(){
      this.$store
      .dispatch(`task/${FETCH_TASKS}`)
      .then(
        () => {
          this.items = this.groupTaskbyDate(this.getTasks);
        },
        err => console.log(`${err.message}`, "Erro", "error")
      );
    },
    completeTask(task){
      console.log('complete', JSON.stringify(task));
      this.$store
      .dispatch(`task/${EDIT_TASK}`, {...task, complete: !task.complete})
      .then(
        () => {
          this.fetchTasks();
        },
        err => console.log(`${err.message}`, "Erro", "error")
      );

    }
  },
  created() {
    this.fetchTasks();
  }
};
</script>

<style lang="css">
.complete{
  text-decoration: line-through;
}

</style>
