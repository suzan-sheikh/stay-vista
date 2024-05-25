import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const [imagePreview, setImagePreview] = useState();
  const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()


  const [loading, setLoading] = useState(false)
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });


  //   Date Range handler
  const handleDates = (item) => {
    console.log(item);
    setDates(item.selection);
  };

  const { user } = useAuth();

  // form handler
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const category = form.category.value;
    const title = form.title.value;
    const to = dates.startDate;
    const from = dates.endDate;
    const price = form.price.value;
    const guests = form.total_guest.value;
    const bathrooms = form.bathrooms.value;
    const description = form.description.value;
    const bedrooms = form.bedrooms.value;
    const image = form.image.files[0];
    const host = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };
    try {
      const image_url = await imageUpload(image);
      const roomData = {
        location,
        category,
        title,
        to,
        from,
        price,
        guests,
        bathrooms,
        description,
        bedrooms,
        host,
        image: image_url,
      };
      await mutateAsync(roomData)
    } catch (err) {
      console.log(err);
      toast.error(err.message)
      
      setLoading(false)
    }
  };

    //   Room data sent to server
    const { mutateAsync } = useMutation({
        mutationFn: async roomData => {
            const {data} = await axiosSecure.post(`/room`, roomData)
            return data
        },
        onSuccess: () => {         
            toast.success('room added successfully')
            navigate('/dashboard/my-listings')
            setLoading(false)   
            console.log('dta saved successfully');
        }
    });

  return (
    <>
      <Helmet>
        <title>Add Room</title>
      </Helmet>
      <AddRoomForm
        dates={dates}
        handleDates={handleDates}
        handleSubmit={handleSubmit}
        setImagePreview={setImagePreview}
        imagePreview={imagePreview}
        loading={loading}
      />
    </>
  );
};

export default AddRoom;
