import React from "react";
// import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
// //--------------------------
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// //--------------------------
// //--------------------------------------------
// import { getToken } from "../features/tokenService";
// import { getTodos, reset } from "../features/todo/todoSlice";
// //--

const Todo = ({ item, ondeleteTodo }) => {
	// const dispatch = useDispatch();
	const navigate = useNavigate();

	const oneditTodo = () => {
		navigate("/update-todo/" + item.id);
	};

	return (
		<li className="list-group-item text-wrap d-flex flex-wrap justify-content-between align-items-center my-1 border border-2">
			<div className="col-12 text-wrap text-break m-0 p-0 ">
				{item.text}
			</div>
			<small className="text-muted justify-self-end">
				{new Date(item.date).toLocaleDateString()}
			</small>
			<div className="col-2 d-flex flex-row align-content-center justify-content-end p-0  m-0">
				<small
					className="btn btn-rounded text-secondary fs-4 m-0 p-0 mx-4"
					onClick={() => oneditTodo(item)}
				>
					<i className="fa fa-pencil fs-4"></i>
				</small>
				<small
					className="btn btn-rounded text-danger fs-4 m-0 p-0"
					onClick={() => ondeleteTodo(item.id)}
				>
					<i className="fa fa-times fs-4"></i>
				</small>
			</div>
		</li>
	);
};

export default Todo;
