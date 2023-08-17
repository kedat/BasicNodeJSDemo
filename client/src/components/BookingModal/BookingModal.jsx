import React, { useContext, useState } from "react";
import { Modal, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import UserDetailContext from "../../context/UserDetailContext.js";
import { bookVisit, handleStripePayment } from "../../utils/api.js";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const BookingModal = ({ opened, setOpened, email, propertyId, data }) => {
	const navigate = useNavigate();
  const [value, setValue] = useState(null);
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);

  const handleBookingSuccess = () => {
    toast.success("You have booked your visit", {
      position: "bottom-right",
    });
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
  };

  
  const handleClickBookings = async () => {
    await bookVisit(value, propertyId, email, token);
    const payload = [data];
    toast.loading('Redirecting...');
    const response = await handleStripePayment(payload);  
    setTimeout(() => {
      window.location.replace(response.data.url);
		}, 3000);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => handleClickBookings(),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => setOpened(false),
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Select your date of visit"
      centered
    >
      <div className="flexColCenter" style={{gap: "1rem"}}>
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button disabled={!value || isLoading} onClick={() => mutate()}>
          Book visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
