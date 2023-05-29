import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
//--------------------------
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
//--------------------------
import Spinner from "react-bootstrap/Spinner";
import { useSendResetMailMutation } from "../slices/auth/authApiSlice";
//--------------------------
const ForgetPassword = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState(null);
	const dispatch = useDispatch();

	const [sendResetMail, { error, isLoading, isError, isSuccess }] =
		useSendResetMailMutation();

	const onChange = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isLoading) {
			return false;
		}
		let data = {
			email,
		};
		// console.log("at create form",data);
		try {
			const res = await sendResetMail(data).unwrap();
			// console.log("res.user", res.user);
		} catch (err) {
			// console.log("err", err);
			if (err.data) {
				let errors = err.data.errors;
				setMessage(errors);
			}
		}
		setEmail("");
	};
	// useEffect(() => {}, [message, isError, isSuccess, dispatch]);
	// console.log(message);
	return (
		<div className="row d-flex mx-auto my-2">
			<p className="text-center h5 fw-bold my-2 mb-3 mx-auto">
				please provide email address of account which you forget
				password
			</p>
			<form
				className="d-flex flex-column flex-fill col-10 justify-content-center align-items-center  mx-auto my-2"
				id="reset-password-form"
				onSubmit={handleSubmit}
			>
				<div className="d-flex flex-row align-items-center mb-2 flex-fill col-sm-8 col-md-6">
					<div className="form-outline flex-fill mb-0">
						<label className="form-label" htmlFor="email">
							Enter your Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							className="form-control flex-fill"
							autoComplete="true"
							value={email}
							onChange={onChange}
						/>
						<small className="text-danger m-0 p-0">
							{message && message.email}
						</small>
					</div>
				</div>
				<div className="form-outline my-0">
					{isLoading ? (
						<Spinner variant="primary" />
					) : (
						<button type="submit" className="btn px-4 btn-primary">
							Send
						</button>
					)}
				</div>
			</form>
			{isSuccess && (
				<div className=" text-center d-flex flex-row align-items-center mt-2">
					<div className="fw-bold flex-fill mb-2 text-center text-info">
						Important -------
						<br />
						Reset mail has been sent to your email address , please
						check your mail for further procedure.
					</div>
				</div>
			)}
			<div className="text-center text-danger m-0 p-1">
				{message && (
					<>
						<small className="text-danger m-0 p-0">
							{message.text}
						</small>
						<small className="text-danger m-0 p-0">
							{message.non_field_errors}
						</small>
						<small className="text-danger m-0 p-0">
							{message.detail &&
								"something went wrong with your login session login again"}
						</small>
					</>
				)}
			</div>
		</div>
	);
};

export default ForgetPassword;
