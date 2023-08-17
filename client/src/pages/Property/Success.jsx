import { useLocation, useNavigate } from "react-router-dom";




const Success = () => {
	const { pathname } = useLocation();
	const id = pathname.split("/").slice(-2)[0];
	const navigate = useNavigate();



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
