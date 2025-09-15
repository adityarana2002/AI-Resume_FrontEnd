import React, { useState } from "react";
import { FiSend, FiTrash2, FiFileText } from "react-icons/fi";
import { generateResume } from "../api/ResumeService";
import toast from "react-hot-toast";
import { FaBrain } from "react-icons/fa";
import { BiBook } from "react-icons/bi";

const GenerateResume = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);




  const [data, setData] = useState({
    personalInformation: {
      fullName: "Aditya Rana",
      email: "adityarana@email.com",
      phoneNumber: "+1 234 567 8901",
      location: {
        city: "New York, USA",
        country: "United States"
      },
      linkedin: "https://example.com",
      githubHub: "GitHub profile",
      portfolio: "Portfolio link"
    }
  });
  // This is Edit input option to change the details function
  function handleChange(event) {
    // Changing personal Informations.....
    const personalInformation = {
      ...data.personalInformation,
      [event.target.name]: event.target.value,
    };
    setData({
      ...data,
      personalInformation: personalInformation,
    });
  }
  // End of edit the input options

  const handleGenerate = async () => {
    console.log("Generating Resume with description:", description);
    try {

      setLoading(true);
      const responseData = await generateResume(description);
      console.log(responseData);
      setData(responseData);
      toast.success("Resume Generated Successfully", {
        duration: 3000,
        position: "top-center",
      });

    } catch (error) {
      console.log(error);
      toast.error("Error Generating Resume");
    } finally {
      setLoading(false);
      setDescription("");
    }
  };

  const handleClear = () => {
    setDescription("");
  };


  // This is Input field in which we having the fields to taking input ..
  function showInputField() {
    return <div className="card w-full max-w-2xl shadow-xl bg-base-100/80 backdrop-blur-md p-8 border border-base-300">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-2 flex items-center justify-center gap-2">
        <FaBrain className="text-primary" /> AI Resume Generator
      </h1>

      {/* Subheading / Explanation */}
      <p className="text-center text-base-content/70 mb-6">
        ✍️ <span className="font-medium">Write about yourself</span> in the box below —
        and our <span className="text-primary font-semibold">AI</span> will transform it
        into a <span className="text-secondary font-semibold">professional, ATS-friendly resume</span> in seconds 🚀
      </p>

      {/* Textarea */}
      <textarea
        disabled={loading}
        className="textarea textarea-bordered w-full h-48 mb-6 focus:shadow-md transition"
        placeholder="Enter your description here..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <button
          disabled={loading}
          onClick={handleGenerate}
          className="btn btn-primary flex items-center gap-2 hover:scale-105 transition"
        >
          {loading && <span className="loading loading-spinner"></span>}
          <FiSend /> Generate
        </button>
        <button
          onClick={handleClear}
          className="btn btn-secondary flex items-center gap-2 hover:scale-105 transition"
        >
          <FiTrash2 /> Clear
        </button>
      </div>
    </div>
  }

  function showForm() {
    return (
      <div className="w-full p-10">
        <h1 className="text-3xl font-bold text-center mb-2 flex items-center justify-center gap-2">
          <BiBook className="text-primary" /> Resume Form
        </h1>
        <div>
          <p className="py-4">
            {/* Personal Information Start.. */}
            Personal Information
          </p>
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-6">
              <label htmlFor="fullName">Full Name:</label>
              <input
                onChange={handleChange} type="text"
                name="fullName"
                id="fullName"
                placeholder="Enter Name"
                value={data.personalInformation.fullName}
                className="input input-bordered w-full" />
            </div>
            <div className="col-span-6">
              <label htmlFor="name">Email:</label>
              <input
                onChange={handleChange} type="text"
                name="email"
                id="email"
                placeholder="Enter here"
                value={data.personalInformation.email}
                className="input input-bordered w-full" />
            </div>
          </div>
          <div className="grid grid-cols-12 mt-3 gap-5">
            <div className="col-span-6">
              <label htmlFor="phoneNumber">Phone:</label>
              <input
                onChange={handleChange} type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Enter Here"
                value={data.personalInformation.phoneNumber}
                className="input input-bordered w-full" />
            </div>
            <div className="col-span-6">
              <label htmlFor="location" >Location:</label>
              <input
                onChange={handleChange} type="text"
                name="location"
                id="location"
                placeholder="Enter here"
                value={data.personalInformation.location.city}
                className="input input-bordered w-full" />
            </div>
          </div>
          <div className="grid grid-cols-12 mt-3 gap-5">
            <div className="col-span-6">
              <label htmlFor="linkedin">LinkedIn:</label>
              <input
                onChange={handleChange} type="text"
                name="linkedin"
                id="linkedin"
                placeholder="Enter Here"
                value={data.personalInformation.linkedin}
                className="input input-bordered w-full" />
            </div>
            <div className="col-span-6">
              <label htmlFor="githubHub" >GitHub:</label>
              <input
                onChange={handleChange} type="text"
                name="githubHub"
                id="githubHub"
                placeholder="Enter here"
                value={data.personalInformation.githubHub}
                className="input input-bordered w-full" />
            </div>
          </div>
          <div className="grid grid-cols-12 mt-3 gap-5">
            <div className="col-span-12">
              <label htmlFor="portfolio">PortFolio:</label>
              <input
                onChange={handleChange} type="text"
                name="portfolio"
                id="portfolio"
                placeholder="Enter Here"
                value={data.personalInformation.portfolio}
                className="input input-bordered w-full" />
            </div>

          </div>
        </div>
        {/* Personal Information End.. */}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 items-center justify-center min-h-screen bg-gradient-to-r from-primary/10 via-base-200 to-secondary/10">
      {showForm()}
      {showInputField()}
    </div>
  );
};

export default GenerateResume;
