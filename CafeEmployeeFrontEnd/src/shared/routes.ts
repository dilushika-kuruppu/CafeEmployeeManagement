import DashboardLayout from "../layouts/AuthLayout";
import Cafe from "../app/cafe/CafeList";
import Employees from "../app/employee/";

const route = [
    {
        path: "/cafe",
        component: DashboardLayout(Cafe),
        isPrivate: false
    },
    {
        path: "/employees",
        component: DashboardLayout(Employees),
        isPrivate: false
    },
]
 
export default route;