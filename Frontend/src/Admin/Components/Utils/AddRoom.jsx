import React, { useState } from "react";
import {
  MdAirplanemodeActive,
  MdCall,
  MdLocalCafe,
  MdLocalTaxi,
  MdOutlineWifi,
  MdPool,
  MdBreakfastDining,
  MdFileUpload,
} from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const AddRoom = () => {
  const [AddRoomsData, setAddRoomsData] = useState({
    name: "",
    description: "",
    price: "",
    man: 0,
    kids: 0,
    bedType: "",
    features: [],
    isBooked: false,
    roomType: "",
    roomSize: "",
    roomFlour: "",
    roomNumber: "",
    roomLocation: "",
  });
  const [mainImage, setMainImage] = useState(null);
  const [scrollBarImages, setScrollBarImages] = useState([]);
  const [previewMainImageUrl, setPreviewMainImageUrl] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddRoomsData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleMainImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(URL.createObjectURL(file));
      const previewMainImageUrl = URL.createObjectURL(file);
      setPreviewMainImageUrl(previewMainImageUrl);
      setMainImage(file);
    }
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      id: e.target.id,
      preview: URL.createObjectURL(file),
      raw: file
    }));

    if (newFiles.length > 5) {
      newFiles.forEach(file => URL.revokeObjectURL(file.preview));
      return toast.error("You can't upload more than 5 images");
    }

    setScrollBarImages((prev) => {
      const prevForId = prev.filter(item => item.id === e.target.id);
      prevForId.forEach(item => URL.revokeObjectURL(item.preview));

      const updated = prev
        .filter(item => item.id !== e.target.id)
        .concat(newFiles);

      const trimmed = updated.slice(0, 5);

      if (updated.length > 5) {
        updated.slice(5).forEach(file => URL.revokeObjectURL(file.preview));
      }

      return trimmed;
    });
    console.log(scrollBarImages);
    
  };
  const handleCheckboxChange = (feature) => {
    setAddRoomsData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };


 const AddRoomData = async () => {
    try {
        const formData = new FormData();
        formData.append("name", AddRoomsData.name);
        formData.append("description", AddRoomsData.description);
        formData.append("price", AddRoomsData.price);
        formData.append("man", AddRoomsData.man);
        formData.append("kids", AddRoomsData.kids);
        formData.append("bedType", AddRoomsData.bedType);
        formData.append("features", AddRoomsData.features.join(",")); // Convert array to string
        formData.append("roomType", AddRoomsData.roomType);
        formData.append("roomSize", AddRoomsData.roomSize);
        formData.append("roomFlour", AddRoomsData.roomFlour);
        formData.append("roomNumber", AddRoomsData.roomNumber);
        formData.append("roomLocation", AddRoomsData.roomLocation);

        // Append main image
        if (mainImage) {
            formData.append("mainImage", mainImage);
        }

        // Append multiple scrollBarImages
        scrollBarImages.forEach((file) => {
            formData.append("scrollBarImages", file.raw);
        });

        await axios.post("http://localhost/api/v1/room/createRoom", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
            console.log(response.data);
            setAddRoomsData({
                name: "",
                description: "",
                price: "",
                man: 0,
                kids: 0,
                bedType: "",
                features: [],
                isBooked: false,
                roomType: "",
                roomSize: "",
                roomFlour: "",
                roomNumber: "",
                roomLocation: "",
            });
            setMainImage(null||" ");
            setScrollBarImages([]);
            toast.success("Room Added Successfully");
        }).catch((error) => {
            toast.error("Room Not Added");
            console.error(error);
        });
    } catch (error) {
        toast.error("Room Not Added");
        console.error(error);
    }
};


  return (
    <div className="bg-gray-300/20  p-6 w-full h-auto flex flex-col font-Poppins overflow-hidden">
      <div className="w-[70vw] bg-white/90 flex flex-col gap-7 p-6 rounded-2xl">
        <h1 className="font-semibold">Add Rooms</h1>
        <div className="flex justify-evenly gap-8">
          <input
            type="text"
            name="name"
            value={AddRoomsData.name}
            onChange={handleChange}
            placeholder="Room Title*"
            required
            className="w-1/2 p-4  rounded-lg border-2 outline-none border-purple-500/70"
          />
          <input
            type="text"
            name="description"
            value={AddRoomsData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-1/2 p-4  rounded-lg border-2 outline-none border-purple-500/70"
          />
        </div>
        <div className="flex justify-evenly gap-8">
          <input
            type="text"
            name="bedType"
            value={AddRoomsData.bedType}
            onChange={handleChange}
            placeholder="Bed Type*"
            className="w-1/2 p-4  rounded-lg border-2 outline-none border-purple-500/70"
            required
          />
          <input
            type="text"
            name="roomLocation"
            value={AddRoomsData.roomLocation}
            onChange={handleChange}
            placeholder="Room Location*"
            className="w-1/2 p-4  rounded-lg border-2 outline-none border-purple-500/70"
            required
          />
        </div>
        <div className="flex justify-evenly gap-8">
          <input
            type="text"
            name="roomSize"
            value={AddRoomsData.roomSize}
            onChange={handleChange}
            placeholder="Room Size*"
            className="w-1/2 p-4  rounded-lg border-2 outline-none border-purple-500/70"
            required
          />
          <select
            name="roomType"
            value={AddRoomsData.roomType}
            onChange={handleChange}
            className="w-1/2 p-4  rounded-lg border-2 outline-none border-purple-500/70"
          >
            <option value="">Room Type</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Suite">Suite</option>
          </select>
        </div>
        <div className="flex justify-evenly gap-8">
          <input
            type="number"
            name="man"
            value={AddRoomsData.man}
            onChange={handleChange}
            placeholder="Man*"
            required
            className="w-1/2 p-4  rounded-lg border-2 outline-none border-purple-500/70"
          />
          <input
            type="number"
            name="kids"
            value={AddRoomsData.kids}
            onChange={handleChange}
            placeholder="Kids"
            className="w-1/2 p-4  rounded-lg border-2 outline-none border-purple-500/70"
          />
        </div>
        <div className="flex justify-evenly gap-8">
          <input
            type="text"
            name="roomNumber"
            value={AddRoomsData.roomNumber}
            onChange={handleChange}
            placeholder="Room Number*"
            required
            className="w-1/2 p-4  rounded-lg border-2 outline-none border-purple-500/70"
          />
          <input
            type="text"
            name="roomFlour"
            value={AddRoomsData.roomFlour}
            onChange={handleChange}
            placeholder="Room Floor*"
            required
            className="w-1/2 p-4  rounded-lg border-2 outline-none border-purple-500/70"
          />
        </div>
        <div className="flex justify-evenly gap-8">
          <input
            type="number"
            name="price"
            value={AddRoomsData.price}
            onChange={handleChange}
            placeholder="Room Price*"
            required
            className="w-1/2 p-4  rounded-lg border-2 outline-none border-purple-500/70"
          />
        </div>
        <div className="flex justify-evenly gap-8 w-full text-xl">
          <p>Features</p>
          {[
            { label: "Pool", icon: <MdPool /> },
            { label: "Call", icon: <MdCall /> },
            { label: "Taxi", icon: <MdLocalTaxi /> },
            { label: "Cafe", icon: <MdLocalCafe /> },
            { label: "Wifi", icon: <MdOutlineWifi /> },
            { label: "Breakfast", icon: <MdBreakfastDining /> },
            { label: "Airplane", icon: <MdAirplanemodeActive /> },
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-2xl">
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(feature.label)}
                checked={AddRoomsData.features.includes(feature.label)}
                className="cursor-pointer"
              />
              {feature.icon}
            </div>
          ))}
        </div>

        <div className="flex justify-evenly  gap-8">

          <div className="w-1/2 p-4 rounded-lg border-2 relative outline-none border-purple-500/70">
            <p className="absolute top-[-10px] bg-white px-3 ">Main Image</p>
            <div>
              <input
                type="file"
                id="MainImage"
                onChange={HandleMainImage}
                accept="image/png, image/jpeg, image/jpg"
                required
                className="hidden"
              />
              <label
                htmlFor="MainImage"
                className="  flex items-center justify-center gap-2 p-2 rounded-lg  text-md  cursor-pointer bg-white"
              >
                <MdFileUpload className="text-2xl" /> Main Image
              </label>
            </div>

            {previewMainImageUrl && <img className="w-full rounded-md h-80 " src={previewMainImageUrl} alt="Image Preview" />}
          </div>

          <div className="w-1/2 p-4  rounded-lg border-2 relative outline-none border-purple-500/70">
            <p className="absolute top-[-10px] bg-white px-3 ">Image 1</p>
            <div>
              <input
                type="file"
                id="Image1"
                onChange={handleImageChange}
                accept="image/png, image/jpeg, image/jpg"
                required
                className="hidden"
              />
              <label
                htmlFor="Image1"
                className="  flex items-center justify-center gap-2 p-2 rounded-lg  text-md  cursor-pointer bg-white"
              >
                <MdFileUpload className="text-2xl" /> Image No 1
              </label>
            </div>
            {scrollBarImages.map((ele) => {
              console.log(ele.preview);
              if (ele.id === "Image1") {
                return <img className="w-full rounded-md h-80 " src={ele.preview} alt="Image Preview" />
              }

            })}

          </div>

        </div>
        
        <div className="flex justify-evenly gap-8">
        <div className="w-1/2 p-4  rounded-lg border-2 relative outline-none border-purple-500/70">
            <p className="absolute top-[-10px] bg-white px-3 ">Image 2</p>
            <div>
              <input
                type="file"
                id="Image2"
                onChange={handleImageChange}
                accept="image/png, image/jpeg, image/jpg"
                required
                className="hidden"
              />
              <label
                htmlFor="Image2"
                className="  flex items-center justify-center gap-2 p-2 rounded-lg  text-md  cursor-pointer bg-white"
              >
                <MdFileUpload className="text-2xl" /> Image No 2
              </label>
            </div>
            {scrollBarImages.map((ele) => {
              console.log(ele.preview);
              if (ele.id === "Image2") {
                return <img className="w-full rounded-md h-80 " src={ele.preview} alt="Image Preview" />
              }

            })}

          </div>

          <div className="w-1/2 p-4  rounded-lg border-2 relative outline-none border-purple-500/70">
            <p className="absolute top-[-10px] bg-white px-3 ">Image 3</p>
            <div>
              <input
                type="file"
                id="Image3"
                onChange={handleImageChange}
                accept="image/png, image/jpeg, image/jpg"
                required
                className="hidden"
              />
              <label
                htmlFor="Image3"
                className="  flex items-center justify-center gap-2 p-2 rounded-lg  text-md  cursor-pointer bg-white"
              >
                <MdFileUpload className="text-2xl" /> Image No 3
              </label>
            </div>
            {scrollBarImages.map((ele) => {
              console.log(ele.preview);
              if (ele.id === "Image3") {
                return <img className="w-full rounded-md h-80 " src={ele.preview} alt="Image Preview" />
              }

            })}

          </div>
        </div>

        <div className="flex justify-evenly gap-8">
        <div className="w-1/2 p-4  rounded-lg border-2 relative outline-none border-purple-500/70">
            <p className="absolute top-[-10px] bg-white px-3 ">Image 4</p>
            <div>
              <input
                type="file"
                id="Image4"
                onChange={handleImageChange}
                accept="image/png, image/jpeg, image/jpg"
                required
                className="hidden"
              />
              <label
                htmlFor="Image4"
                className="  flex items-center justify-center gap-2 p-2 rounded-lg  text-md  cursor-pointer bg-white"
              >
                <MdFileUpload className="text-2xl" /> Image No 4
              </label>
            </div>
            {scrollBarImages.map((ele) => {
              console.log(ele.preview);
              if (ele.id === "Image4") {
                return <img className="w-full rounded-md h-80 " src={ele.preview} alt="Image Preview" />
              }

            })}

          </div>

          <div className="w-1/2 p-4  rounded-lg border-2 relative outline-none border-purple-500/70">
            <p className="absolute top-[-10px] bg-white px-3 ">Image 5</p>
            <div>
              <input
                type="file"
                id="Image5"
                onChange={handleImageChange}
                accept="image/png, image/jpeg, image/jpg"
                required
                className="hidden"
              />
              <label
                htmlFor="Image5"
                className="  flex items-center justify-center gap-2 p-2 rounded-lg  text-md  cursor-pointer bg-white"
              >
                <MdFileUpload className="text-2xl" /> Image No 5
              </label>
            </div>
            {scrollBarImages.map((ele) => {
              console.log(ele.preview);
              if (ele.id === "Image5") {
                return <img className="w-full rounded-md h-80 " src={ele.preview} alt="Image Preview" />
              }

            })}

          </div>
        </div>


        <div className="flex justify-evenly gap-8">
          <button
            className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-lg text-white rounded-lg font-medium"
            onClick={AddRoomData}
          >
            Submit
          </button>
          <button className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-lg text-white rounded-lg font-medium">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
