import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
//--------------------------
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useResetPasswordMutation } from "../slices/auth/authApiSlice";
import { setCredentials } from "../slices/auth/authSlice";
//--------------------------
import Spinner from "react-bootstrap/Spinner";
//--------------------------
const ResetPassword = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { uid, resetToken } = useParams();
	const [message, setMessage] = useState("");
	const [resetPassword, { isLoading, isError, isSuccess }] =
		useResetPasswordMutation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const actualData = {
			password: data.get("password"),
			password2: data.get("password_confirmation"),
		};
		// console.log("actualData", actualData);
		try {
			let data = {
				actualData,
				uid,
				resetToken,
			};
			const res = await resetPassword(data).unwrap();
			// console.log("res.user", res.user);
			// navigate("/");
		} catch (err) {
			// console.log("err", err);
			if (err.data) {
				let errors = err.data.errors;
				setMessage(errors);
			}
		}

		if (isSuccess) {
			console.log("reset success!!");
			document.getElementById("new-password-form").reset();
			// navigate("/login");
		}
	};

	useEffect(() => {}, [navigate]);

	return (
		<div className="container">
			<div className="row d-flex">
				<div className="col-md-10 mx-auto my-2">
					<div className="card text-black">
						<div className="card-body p-md-2 m-0">
							<div className="row justify-content-center">
								<div className="col-md-8 col-lg-6 col-xl-5 order-2 order-lg-1">
									<p className="text-center h1 fw-bold my-2 mb-4 mx-auto">
										Reset new Password
									</p>
									<form
										className="mx-auto p-0 m-0"
										id="new-password-form"
										onSubmit={handleSubmit}
									>
										<div className="d-flex flex-row align-items-center mb-2">
											<i className="fas fa-lock fa-lg me-3 fa-fw"></i>
											<div className="form-outline flex-fill mb-0">
												<label
													className="form-label"
													htmlFor="new-password"
												>
													Enter a new Password
												</label>
												<input
													type="password"
													id="password"
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

										<div className="d-flex flex-row align-items-center mb-2">
											<i className="fas fa-key fa-lg me-3 fa-fw"></i>
											<div className="form-outline flex-fill mb-0">
												<label
													className="form-label"
													htmlFor="password_confirmation"
												>
													confirm your password
												</label>
												<input
													type="password"
													id="password_confirmation"
													name="password_confirmation"
													className="form-control"
													autoComplete="true"
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
													Reset
												</button>
											)}
										</div>
									</form>
									{isSuccess && (
										<div className=" text-center d-flex flex-row align-items-center mt-1">
											<div className="fw-bold flex-fill my-1 text-center text-info">
												New password has been set
												successfully!
												<br />
												now you can login using it.
												<Link
													className="text-primary mx-2 text-decoration-underline"
													to="/login"
												>
													Login
												</Link>
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
export default ResetPassword;
