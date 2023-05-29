import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
//--------------------------
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLoginMutation } from "../slices/auth/authApiSlice";
import { setCredentials } from "../slices/auth/authSlice";
//--------------------------
import Spinner from "react-bootstrap/Spinner";
import { setTokens } from "../slices/tokenService";
//--------------------------
const LoginPage = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	// const message = "";
	const [message, setMessage] = useState("");
	const [login, { isLoading, isError, isSuccess }] = useLoginMutation();
	const { user } = useSelector((state) => state.auth);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isLoading) {
			return false;
		}
		const data = new FormData(e.currentTarget);
		const actualData = {
			email: data.get("username"),
			password: data.get("password"),
		};
		try {
			const res = await login(actualData).unwrap();
			// console.log("res.user", res.user);
			setTokens(res.token);
			dispatch(setCredentials(res.user));
			navigate("/");
		} catch (err) {
			console.log("err", err);
			if (err.data) {
				let errors = err.data.errors;
				setMessage(errors);
			}
		}
		// console.log(actualData);
		// dispatch(login(actualData));
		// console.log(user);
		if (user || isSuccess) {
			// console.log("login success!!");
			document.getElementById("login-form").reset();
			navigate("/");
		}
	};
	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [navigate, user]);

	return (
		<div className="container">
			<div className="row d-flex">
				<div className="col-md-10 mx-auto my-2">
					<div className="card text-black">
						<div className="card-body p-md-2 m-0">
							<div className="row justify-content-center">
								<div className="col-md-8 col-lg-6 col-xl-5 order-2 order-lg-1">
									<p className="text-center h1 fw-bold my-2 mb-4 mx-auto">
										Log In
									</p>
									<form
										className="mx-auto p-0 m-0"
										id="login-form"
										onSubmit={handleSubmit}
									>
										<div className="d-flex flex-row align-items-center mb-2">
											<i className="fas fa-user fa-lg me-3 fa-fw"></i>
											<div className="form-outline flex-fill mb-0">
												<label
													className="form-label"
													htmlFor="email"
												>
													Your Email
												</label>
												<input
													type="email"
													id="email"
													name="username"
													className="form-control"
													autoComplete="true"
												/>

												<small className="text-danger m-0 p-0">
													{message && message.email}
												</small>
											</div>
										</div>

										<div className="d-flex flex-row align-items-center mb-2">
											<i className="fas fa-key fa-lg me-3 fa-fw"></i>
											<div className="form-outline flex-fill mb-0">
												<label
													className="form-label"
													htmlFor="current-password"
												>
													Password
												</label>
												<input
													type="password"
													id="current-password"
													name="password"
													className="form-control"
													autoComplete="true"
												/>
												<small className="text-danger m-0 p-0">
													{message &&
														message.password}
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
													Login
												</button>
											)}
										</div>
									</form>
									<div className="text-center mt-3">
										<small className="text-muted">
											Forget Password?
											<Link
												className="text-primary mx-2 text-decoration-underline"
												to="/forgetPassword"
											>
												Reset Password
											</Link>
										</small>
									</div>
									<div className="text-center mb-3">
										<small className="text-muted">
											Don't have account, Create one.
											<Link
												className="text-primary mx-2 text-decoration-underline"
												to="/register"
											>
												Register
											</Link>
										</small>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
