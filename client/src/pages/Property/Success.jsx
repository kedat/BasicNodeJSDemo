import { useContext } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { removeBooking } from "../../utils/api";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext.js";
import { toast } from "react-toastify";
const Success = () => {
	const { pathname } = useLocation();
	const id = pathname.split("/").slice(-2)[0];
	const { validateLogin } = useAuthCheck();
	const navigate = useNavigate();

	const { user } = useAuth0();

	const {
		userDetails: { token, bookings },
		setUserDetails,
	} = useContext(UserDetailContext);

	const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
		mutationFn: () => removeBooking(id, user?.email, token),
		onSuccess: () => {
			setUserDetails((prev) => ({
				...prev,
				bookings: prev.bookings.filter((booking) => booking?.id !== id),
			}));

			toast.success("Booking cancelled", { position: "bottom-right" });
		},
	});

	return (
		<div className="wrapper">
			<div className="flexColStart paddings innerWidth property-container">
				Successfully. Thanks for your order.
				<p
					style={{
						color: "red",
						cursor: "pointer",
					}}
					onClick={() => navigate(`../${id}`)}
				>
					Back to the property
				</p>
			</div>
		</div>
	);
};

export default Success;
