import React, { useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
//---------------------------------------
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout } from "../slices/auth/authSlice";
//---------------------------------------
const Navbar = () => {
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	useEffect(() => {
		// console.log("user in navbar", user);
	}, [user]);

	const handleLogout = () => {
		// console.log("Logout Clicked");
		dispatch(logout());
		navigate("/login");
	};
	// console.log(access_token);
	return (
		<nav className="navbar navbar-expand-md bg-primary navbar-dark ">
			<div className="container-fluid col-sm-8 mx-auto text-center">
				<Link
					className="navbar-brand active"
					aria-current="page"
					// to="#"
					to="/"
				>
					TODO
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						{user ? (
							<>
								<li className="nav-item">
									<Link
										className="nav-link active"
										aria-current="page"
										to="/"
									>
										Home
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/profile">
										{user.name}
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link"
										to="/login"
										onClick={handleLogout}
									>
										Logout
									</Link>
								</li>
							</>
						) : (
							<>
								<li className="nav-item">
									<Link className="nav-link" to="/register">
										Register
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/login">
										Login
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
