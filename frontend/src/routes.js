import Overview from "./pages/overview/Overview";
import AddTask from "./pages/add-task/AddTask";

export const routes = [
  { path: "/overview", component: Overview, label: "Próximas tarefas" },
  { path: "/add-task", component: AddTask, label: "Adicionar tarefa" },
  { path: "/", redirect: "/overview" },
];
