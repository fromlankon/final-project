import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/site/main/MainLayout";
import Home from "./layouts/site/main/pages/Home";
import AuthLayout from "./layouts/site/auth/AuthLayout";
import Login from "./layouts/site/auth/pages/Login";
import Register from "./layouts/site/auth/pages/Register";
import Details from "./layouts/site/main/pages/Details";
import { useContext, useEffect } from "react";
import Wishlist from "./layouts/site/main/pages/Wishlist";
import Shop from "./layouts/site/main/pages/Shop";
import Cart from "./layouts/site/main/pages/Cart";
import Checkout from "./layouts/site/main/pages/Checkout";
import Dashboard from "./layouts/dashboard/main/pages/dashboard/Dashboard";
import Brands from "./layouts/dashboard/main/pages/brands/Brands";
import Products from "./layouts/dashboard/main/pages/products/Products";
import Orders from "./layouts/dashboard/main/pages/orders/Orders"
import Staff from "./layouts/dashboard/main/pages/user/User"
import Admin from "./layouts/dashboard/main/Admin";
import { ProfileCall } from "./services/auth";
import AuthRoute from "./helpers/AuthRoute";
import { UserContext } from "./context/AuthContext";
import ProtectRoute from "./helpers/ProtectRoute";
import AdminLogin from "./layouts/dashboard/auth/AdminLogin";
import AuthSiteRoute from "./helpers/AuthSiteRoute";
import StaffRoute from "./helpers/StaffRoute";
import NotFound from "./layouts/site/main/pages/NotFound";
import About from "./layouts/site/main/pages/About";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/home" />,
            },
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "/home/:_id/:brandName",
                element: <Details />,
            },
            {
                path: "wishlist",
                element: <Wishlist />,
            },
            {
                path: "shop",
                element: <Shop />,
            },
            {
                path: "cart",
                element: <Cart />,
            },
            {
                path: "checkout",
                element: <AuthSiteRoute> <Checkout /> </AuthSiteRoute>,
            },
            {
                path: "*",
                element: <NotFound />
            }
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "",
                element: <Login />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            }
        ]
    },
    {
        path: "admin",
        element: (
            <AuthRoute>
                <ProtectRoute>
                    <Admin />
                </ProtectRoute>
            </AuthRoute>
        ),
        children: [
            {
                path: "",
                element: <Dashboard />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "products",
                element: <Products />,
            },
            {
                path: "brands",
                element: <Brands />
            },
            {
                path: "orders",
                element: <Orders />,
            },
            {
                path: "users",
                element: <StaffRoute> <Staff /> </StaffRoute>,
            },
        ]
    },
    {
        path: "adminlogin",
        element: <AdminLogin />,
    }
]);

export const MainRouter = () => {
    const { setUser } = useContext(UserContext)
    useEffect(() => {
        ProfileCall()
            .then(({ data }) => {
                setUser(data.data.user)
            })
            .catch(() => {
                setUser(false)
            })
    }, [])

    return <RouterProvider router={router} />
}