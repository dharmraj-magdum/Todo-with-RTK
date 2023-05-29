import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//--------------------------
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
//--------------------------
import Spinner from "react-bootstrap/Spinner";
import { getToken } from "../slices/tokenService";
import {
	useUpdateTodoMutation,
	useGetAllQuery,
} from "../slices/todos/todosApiSlice";
//--------------------------
const UpdateTodoForm = () => {
	const { id } = useParams();
	const [text, setText] = useState("");
	// console.log("id", id);
	const token = getToken(1);
	const { data: todos } = useGetAllQuery(token);
	let oldTodo = null;
	if (todos) {
		oldTodo = todos.find((item) => item.id == id);
	}

	const navigate = useNavigate();
	// console.log("oldtodo", oldTodo);

	const dispatch = useDispatch();
	const [updateTodo, { error: message, isLoading, isError, isSuccess }] =
		useUpdateTodoMutation();
	const onChange = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isLoading) {
			return false;
		}
		let data = {
			id: oldTodo.id,
			todo: {
				text: text,
			},
			token: token,
		};
		// console.log("at update form",data);
		await updateTodo(data);
		setText("");
		// setChange(false);
	};
	useEffect(() => {
		if (oldTodo) {
			setText(oldTodo.text);
		}
		if (isSuccess) {
			navigate("/");
		}
	}, [isError, isSuccess, dispatch]);

	return (
		<div className="row d-flex mx-auto my-2">
			<p className="text-center h1 fw-bold my-2 mb-3 mx-auto">
				Update your Todo
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
							Update
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

export default UpdateTodoForm;
