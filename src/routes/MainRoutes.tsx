import Loader from "../common/Loader/Loader";
import MinimalLayout from "../layout/MinimalLayout";
import AuthGuard from "../utils/AuthGuard";
import ECommerce from '../pages/Dashboard/ECommerce';
import DefaultLayout from "../layout/DefaultLayout";
import CreateCustomer from "../pages/customers/create";
import ListCustomer from "../pages/customers/list";
import Profile from "../pages/Profile";
import Buttons from "../pages/UiElements/Buttons";
import Alerts from "../pages/UiElements/Alerts";
import Chart from "../pages/Chart";
import Settings from "../pages/Settings";
import Tables from "../pages/Tables";
import FormLayout from "../pages/Form/FormLayout";
import FormElements from "../pages/Form/FormElements";
import Users from "../pages/users";
import CreateUsers from "../pages/users/CreateUsers";
import CreateSupplierView from "../pages/supplier/createSupplierView";
import Supplier from "../pages/supplier";


const MainRoutes = [
    {
        path: "/",
        element: (
            <AuthGuard>
                <MinimalLayout />
            </AuthGuard>
        ),
        loader: async () => {
            return (<Loader />)
        },
        children: [
            {
                path: '/',
                element: (
                    <DefaultLayout>
                        <ECommerce />
                    </DefaultLayout>
                )

            },
            {
                path: '/suppliers/create',
                element: (
                    <DefaultLayout>
                        <CreateSupplierView />
                    </DefaultLayout>
                )

            },
            {
                path: '/suppliers/update/:type/:id/',
                element: (
                    <DefaultLayout>
                        <CreateSupplierView />
                    </DefaultLayout>
                )

            },
            {
                path: '/suppliers',
                element: (
                    <DefaultLayout>
                        <Supplier />
                    </DefaultLayout>
                )

            },
            {
                path: '/users/create',
                element: (
                    <DefaultLayout>
                        <CreateUsers />
                    </DefaultLayout>
                )

            },
            {
                path: '/users',
                element: (
                    <DefaultLayout>
                        <Users />
                    </DefaultLayout>
                )

            },
            {
                path: '/customers/create',
                element: (
                    <DefaultLayout>
                        <CreateCustomer />
                    </DefaultLayout>
                )

            },
            {
                path: '/customers/list',
                element: (
                    <DefaultLayout>
                        <ListCustomer />
                    </DefaultLayout>
                )

            },
            {
                path: '/profile',
                element: (
                    <DefaultLayout>
                        <Profile />
                    </DefaultLayout>
                )

            },
            {
                path: '/forms/form-elements',
                element: (
                    <DefaultLayout>
                        <FormElements />
                    </DefaultLayout>
                )

            },
            {
                path: '/forms/form-layout',
                element: (
                    <DefaultLayout>
                        <FormLayout />
                    </DefaultLayout>
                )

            },
            {
                path: '/tables',
                element: (
                    <DefaultLayout>
                        <Tables />
                    </DefaultLayout>
                )

            },
            {
                path: '/settings',
                element: (
                    <DefaultLayout>
                        <Settings />
                    </DefaultLayout>
                )

            },
            {
                path: '/chart',
                element: (
                    <DefaultLayout>
                        <Chart />
                    </DefaultLayout>
                )

            },
            {
                path: '/ui/alerts',
                element: (
                    <DefaultLayout>
                        <Alerts />
                    </DefaultLayout>
                )

            },
            {
                path: '/ui/buttons',
                element: (
                    <DefaultLayout>
                        <Buttons />
                    </DefaultLayout>
                )

            },

        ],
    },

]



export default MainRoutes;