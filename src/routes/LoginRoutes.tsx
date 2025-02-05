import Loader from "../common/Loader/Loader";
import Layout from "../layout/layout";
import MinimalLayout from "../layout/MinimalLayout";
import SignIn from "../pages/Authentication/SignIn";
import SignUp from "../pages/Authentication/SignUp";
import GuestGuard from "../utils/GuestGuard";

const LoginRoutes = [
    {
        path: "login",
        element: <MinimalLayout />,
        // index: true,
        loader: async () => {
            return await <Loader />
        },
        children: [
          {
            path: "/login",
            // element: (<Layout><SignIn /></Layout>),
            element:(
                <GuestGuard>
                    <Layout>
                        <SignIn />
                    </Layout>
                </GuestGuard>
            ),
            loader: async () => {
                return <Loader />
            },
          },
        ],
    },
    {
        path: "signup",
        element: <MinimalLayout />,
        // index: true,
        loader: async () => {
            return await <Loader />
        },
        children: [
            {
                path: "/signup",
                // element: (<Layout><SignIn /></Layout>),
                element:(
                    <GuestGuard>
                        <Layout>
                            <SignUp />
                        </Layout>
                    </GuestGuard>
                ),
                loader: async () => {
                    return await <Loader />
                },
              },
            ],
    }

]

export default LoginRoutes;