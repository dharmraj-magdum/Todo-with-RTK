import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//--------------------------
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
//--------------------------
import Spinner from "react-bootstrap/Spinner";
import { getToken } from "../slices/tokenService";
import { useCreateTodoMutation } from "../slices/todos/todosApiSlice";
//--------------------------
const TodoForm = () => {
	const [text, setText] = useState("");
	// const [message, setMessage] = useState("");

	const dispatch = useDispatch();

	const [createTodo, { error: message, isLoading, isError, isSuccess }] =
		useCreateTodoMutation();

	const onChange = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isLoading) {
			return false;
		}
		const token = getToken(1);
		let data = {
			todo: {
				text: text,
			},
			token: token,
		};
		// console.log("at create form",data);
		try {
			const res = await createTodo(data).unwrap();
			// console.log("res.user", res.user);
		} catch (err) {
			// console.log(err);
			// let errors = err.data.errors;
		}
		setText("");
	};
	// useEffect(() => {}, [message, isError, isSuccess, dispatch]);
	// console.log(message);
	return (
		<div className="row d-flex mx-auto my-2">
			<p className="text-center h1 fw-bold my-2 mb-3 mx-auto">
				Make a Todo
			</p>
			<form
				className="d-flex justify-content-center align-items-center col-sm-8 mx-auto my-2"
				id="todo-form"
				onSubmit={handleSubmit}
			>
				<div className="form-outline flex-fill mb-0 mx-3">
					<input
						type="text"
						id="text"
						name="text"
						className="form-control"
						onChange={onChange}
						value={text}
					/>
				</div>
				<div className="form-outline my-0">
					{isLoading ? (
						<Spinner variant="primary" />
					) : (
						<button type="submit" className="btn px-4 btn-primary">
							Add
						</button>
					)}
				</div>
			</form>
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

export default TodoForm;
