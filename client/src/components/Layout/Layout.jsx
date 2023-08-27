import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
import { useMutation } from "react-query";
import { createUser } from "../../utils/api";
import useFavorites from "../../hooks/useFavorites";
import useBookings from "../../hooks/useBookings";

const Layout = () => {
	useFavorites();
	useBookings();

	const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
	const { setUserDetails } = useContext(UserDetailContext);

	const { mutate } = useMutation({
		mutationKey: [user?.email],
		mutationFn: (token) => createUser(user?.email, token),
	});

	return (
		<>
			<div style={{ background: "var(--black)", overflow: "hidden" }}>
				<Header />
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

export default Layout;
