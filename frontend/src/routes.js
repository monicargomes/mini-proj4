import Overview from "./views/overview/Overview";
import AddTask from "./views/add-task/AddTask";

export const routes = [
  {
    path: "/overview",
    component: Overview,
    name: "overview"
  },
  {
    path: "/add",
    component: AddTask
  },
  {
    path: "/edit/:id",
    component: AddTask,
    name: "edit"
  },
  {
    path: "/",
    redirect: "/overview"
  }
];
