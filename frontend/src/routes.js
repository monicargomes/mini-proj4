import Overview from "./views/overview/Overview";
import AddTask from "./views/add-task/AddTask";
import Login from "./views/login/Login";
import Register from "./views/register/Register";

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
    path: "/register",
    component: Register,
    name: "register"
  },
  {
    path: "/login",
    component: Login,
    name: "login"
  },
  {
    path: "/",
    redirect: "/login"
  }
];
