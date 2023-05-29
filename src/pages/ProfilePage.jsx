import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//--------------------------
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
//--------------------------
import Spinner from "react-bootstrap/Spinner";
//--------------------------------------------
import Todo from "../components/Todo";
import TodoForm from "../components/TodoForm";
import {
	useLoginMutation,
	useUpdateUserMutation,
} from "../slices/auth/authApiSlice";
import {
	useDeleteTodoMutation,
	useGetAllQuery,
} from "../slices/todos/todosApiSlice";
import { logout } from "../slices/auth/authSlice";
import { setCredentials } from "../slices/auth/authSlice";
import { getToken } from "../slices/tokenService";
//--------------------------------------------

const ProfilePage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [message, setMessage] = useState("");
	const { user } = useSelector((state) => state.auth);
	//----------------------------
	const [state, setState] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});
	//----------------------------
	const [userUpdate, { isLoading, isError, isSuccess }] =
		useUpdateUserMutation();
	const token = getToken(1);
	const handleSubmit = async (e) => {
		e.preventDefault();
		let actualData = {};
		actualData.name = state.name;
		actualData.email = state.email;
		if (state.password) {
			actualData.password = state.password;
			actualData.password2 = state.password2;
		}
		// console.log("actualData", actualData);
		try {
			const data = {
				actualData,
				token,
			};
			const res = await userUpdate(data).unwrap();
			// console.log("res.user", res.user);
			dispatch(setCredentials(res.user));
		} catch (err) {
			// console.log("err", err);
			if (err.data) {
				let errors = err.data.errors;
				setMessage(errors);
			}
		}
	};

	function handleChange(evt) {
		const value = evt.target.value;
		setState({
			...state,
			[evt.target.name]: value,
		});
	}

	useEffect(() => {
		// const token = getToken(1);
		// const not_valid_token = error ? error.text == "UNAUTHORIZED" : false;
		// if (!user || !token || not_valid_token) {
		// if (!user || error || !token) {
		if (!isLoading) {
			if (!token) {
				dispatch(logout());
				// console.log("You have token but faulty");
				navigate("/login");
			}
		}
		if (user) {
			setState((prevState) => ({
				...prevState,
				name: user.name,
				email: user.email,
				password: "",
			}));
		}
	}, [token]);

	return (
		<div className="container">
			<div className="row d-flex">
				<div className="col-md-10 mx-auto my-2">
					<div className="card text-black">
						<div className="card-body p-md-2 m-0">
							<div className="row justify-content-center">
								<div className="col-md-8 col-lg-6 col-xl-5 order-2 order-lg-1">
									<p className="text-center h1 fw-bold my-2 mb-4 mx-auto">
										Your Profile
									</p>
									<form
										className="mx-auto p-0 m-0"
										id="registration-form"
										onSubmit={handleSubmit}
										autoComplete="false"
									>
										<div className="d-flex flex-row align-items-center mb-2">
											<i className="fas fa-user fa-lg me-3 fa-fw"></i>
											<div className="form-outline flex-fill mb-0">
												<label className="form-label">
													Your Name
												</label>
												<input
													type="text"
													id="name"
													name="name"
													className="form-control"
													value={state.name}
													onChange={handleChange}
												/>
												<small className="text-danger m-0 p-0">
													{message && message.name}
												</small>
											</div>
										</div>

										<div className="d-flex flex-row align-items-center mb-2">
											<i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
											<div className="form-outline flex-fill mb-0">
												<label className="form-label">
													Your Email
												</label>
												<input
													type="email"
													id="email"
													name="email"
													className="form-control"
													autoComplete="false"
													value={state.email}
													onChange={handleChange}
												/>

												<small className="text-danger m-0 p-0">
													{message && message.email}
												</small>
											</div>
										</div>
										<div className="d-flex flex-row align-items-center mt-4">
											<div className="form-outline flex-fill mb-2 text-center form-label">
												Change passsword
											</div>
										</div>
										<div className="d-flex flex-row align-items-center mb-2">
											<i className="fas fa-lock fa-lg me-3 fa-fw"></i>
											<div className="form-outline flex-fill mb-0">
												<label className="form-label">
													New Password
												</label>
												<input
													type="password"
													id="password"
													name="password"
													className="form-control"
													autoComplete="new-password"
													value={state.password}
													onChange={handleChange}
												/>
												<small className="text-danger m-0 p-0">
													{message &&
														message.password}
												</small>
											</div>
										</div>

										<div className="d-flex flex-row align-items-center mb-2">
											<i className="fas fa-key fa-lg me-3 fa-fw"></i>
											<div className="form-outline flex-fill mb-0">
												<label className="form-label">
													confirm your password
												</label>
												<input
													type="password"
													id="password_confirmation"
													name="password_confirmation"
													className="form-control"
													value={state.password2}
													onChange={handleChange}
												/>

												<small className="text-danger m-0 p-0">
													{message &&
														message.password2}
												</small>
											</div>
										</div>
										<div className="text-center text-danger my-2 p-1">
											<small className="">
												{message &&
													message.non_field_errors}
											</small>
										</div>
										<div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
											{isLoading ? (
												<Spinner variant="primary" />
											) : (
												<button
													type="submit"
													className="btn btn-primary btn-lg"
												>
													Update
												</button>
											)}
										</div>
									</form>
									{isSuccess && (
										<div className="d-flex flex-row align-items-center mt-2">
											<div className="fw-bold flex-fill mb-2 text-center text-success">
												Updated Successfully!!!
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
