import Dashboard from "containers/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import Reports from "containers/Reports";
import Typography from "views/Typography/Typography";
import Icons from "views/Icons/Icons";
import Maps from "views/Maps/Maps";
import Notifications from "views/Notifications/Notifications";
import Upgrade from "views/Upgrade/Upgrade";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  // {
  //   path: "/user",
  //   name: "Usuário",
  //   icon: "pe-7s-user",
  //   component: UserProfile
  // },
  {
    path: "/relatorio/:report",
    name: "Relatórios",
    icon: "pe-7s-note2",
    component: Reports
  },
  // {
  //   path: "/notifications",
  //   name: "Notificações",
  //   icon: "pe-7s-bell",
  //   component: Notifications
  // },
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default dashboardRoutes;
