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
import { useLoginMutation } from "../slices/auth/authApiSlice";
import {
	useDeleteTodoMutation,
	useGetAllQuery,
} from "../slices/todos/todosApiSlice";
import { logout } from "../slices/auth/authSlice";
import { setCredentials } from "../slices/auth/authSlice";
import { getToken } from "../slices/tokenService";
//--------------------------------------------

const Home = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const [updating, setUpdating] = useState(false);
	const { user } = useSelector((state) => state.auth);
	// const todos = [];
	const token = getToken(1);
	const { data: todos, error, isLoading, isSuccess } = useGetAllQuery(token);
	// const { deleteTodo,[ error, isLoading, isSuccess] } = useDeleteTodoMutation;
	const [deleteTodo, { isLoading: deleteting }] = useDeleteTodoMutation();
	// console.log(todos);
	// console.log("todos", todos);
	const ondeleteTodo = async (id) => {
		if (deleteting) {
			// console.log("already deleting");
			return;
		}
		const token = getToken(1);
		const data = {
			id: id,
			token: token,
		};
		await deleteTodo(data);
	};

	useEffect(() => {
		// const token = getToken(1);
		// const not_valid_token = error ? error.text == "UNAUTHORIZED" : false;
		// if (!user || !token || not_valid_token) {
		// if (!user || error || !token) {
		if (!user || !token) {
			// console.log("You have token but faulty");
			// console.log("wrong user or token in home page");
			dispatch(logout());
			navigate("/login");
		}
	}, [user, token]);
	// console.log(error);
	return (
		<div className="container co-sm-10">
			<div className="row d-flex">
				{/* <h1>HOME PAGE</h1> */}
				<TodoForm />
				<ul className="list-group col-sm-10 mx-auto py-3 px-4">
					{todos && todos.length == 0 && (
						<h2>No todos added yet add one now</h2>
					)}
					{todos &&
						todos.map((todo, i) => {
							return (
								<Todo
									key={i}
									item={todo}
									ondeleteTodo={ondeleteTodo}
								/>
							);
						})}
				</ul>
			</div>
		</div>
	);
};

export default Home;
