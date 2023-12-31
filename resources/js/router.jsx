import {createBrowserRouter} from "react-router-dom"
import Home from './Page/Home/index'
import Product from './Page/Product/index'
import ProductShow from './Page/Product/Show'
import NotFound from './Page/Error/NotFound'
import AppLayout from './Layouts/AppLayout'
import Register from './Page/Auth/Register'
import ForgotPassword from './Page/Auth/ForgotPassword'
import Login from './Page/Auth/Login'
import Profile from './Page/User/Profile'
import Edit from './Page/User/Edit'
import ChangePassword from './Page/User/ChangePassword'
import ChangeEmail from './Page/User/ChangeEmail'
import MainCartPage from './Page/Cart/mainCartPage'
import Order from './Page/Order/Index.jsx'
import BuyOrder from './Page/Order/BuyOrder.jsx'
import Confirmation from './Page/Order/Confirmation.jsx'
import About from './Page/About/Index.jsx'
import OrderEditAddress from './Page/Order/OrderEditAddress.jsx'



const router = createBrowserRouter([

	{
		path:"/",
		element:<AppLayout />,
		children : [
			{
				path:"pos",
				element:<Home />,
			},
			{
				path:"pos/products",
				element:<Product />,
			},
			{
				path:"pos/products/:code",
				element:<ProductShow />,
			},
			{
				path:"pos/cart",
				element : <MainCartPage />,
			},
			{
				path:"guest/register",
				element : <Register />,
			},

			{
				path:"user/profile",
				element : <Profile />,
			},
			{
				path:"user/order/:cartType/:token",
				element : <Order />,
			},
			{
				path:"user/order/confirmation/:id",
				element : <Confirmation />,
			},
			{
				path:"user/order/edit-address/:id",
				element : <OrderEditAddress />,
			},
			{
				path:"/about-us",
				element : <About />
			},
			{
				path:"user/edit",
				element : <Edit />,
			},
			{
				path:"user/change-password",
				element : <ChangePassword />,
			},
			{
				path:"user/change-email",
				element : <ChangeEmail />,
			},
			{
				path:"guest/forgot-password",
				element : <ForgotPassword />,
			},
			{
				path:"guest/login",
				element : <Login />,
			},
			{
				path:"*",
				element: <NotFound />
			}
		],
	},
	
]);


export default router;