import "./App.css";
//---------------------------------------
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
//---------------------------------------
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
//---------------------------------------
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateTodoForm from "./components/UpdateTodoForm";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
//---------------------------------------
function App() {
	return (
		<div className="light">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<HomePage />} />

						<Route path="login" element={<LoginPage />} />
						<Route path="register" element={<RegistrationPage />} />
						<Route path="profile" element={<ProfilePage />} />
						<Route
							path="update-todo/:id/"
							element={<UpdateTodoForm />}
						/>
						<Route
							path="forgetPassword/"
							element={<ForgetPassword />}
						/>
						<Route
							path="/todo/reset-password/:uid/:resetToken"
							element={<ResetPassword />}
						/>
					</Route>
					<Route
						path="*"
						element={<h1>Error 404 Page not found !!</h1>}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
{
	/* <Route
						path="login"
						element={
							!access_token ? <LoginPage /> : <Navigate to="/" />
						}
					/> */
}
