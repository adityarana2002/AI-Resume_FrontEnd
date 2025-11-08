import React, { useState } from "react";
import { FiSend, FiTrash2, FiFileText } from "react-icons/fi";
import { generateResume } from "../api/ResumeService";
import {useForm, useFieldArray} from "react-hook-form";
import {  FaPlusCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { FaTrash,FaBrain } from "react-icons/fa";
import { BiBook } from "react-icons/bi";

const GenerateResume = () => {
  const [data, setData] = useState({
    personalInformation: {
      fullName: "John Doe",
      email: "john.doe@email.com",
      phoneNumber: "+1234567890",
      location: "New York, USA",
      linkedIn: "https://www.linkedin.com/in/johndoe/",
      gitHub: "https://github.com/johndoe",
      portfolio: "https://john-doe.portfolio website",
    },
    summary: "Experienced Java Developer...",
    skills: {
      programmingLanguages: ["Java", "Hindi", "English"],
      frameworks: ["Spring Boot", "React.js"],
      databases: ["MySQL", "PostgreSQL", "MongoDB"],
      cloud: ["AWS"],
      devOpsTools: ["Docker", "Kubernetes", "Ansible"],
      otherSkills: ["RESTful APIs", "Microservices"],
    },
    experience: [
      {
        jobTitle: "Senior Software Developer",
        company: "XYZ Solutions",
        location: "New York, USA",
        duration: "Jan 2017 - Present",
      },
    ],
  });
  const {register, handleSubmit , control } = useForm({
    defaultValues: data,
  });

  // Handle form submit
  const onSubmit = (data) =>{
    console.log("Form Data:" , data);
  }
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  

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

  const renderInput = (name, label, type = "text") =>(
    <div className="form-control w-full max-w-lg mb-4">
      <label className="label">
        <span className="label-text text-base-content">{label}</span>
      </label>
      <input
      type={type}
      {...register(name)}
      className="input input-bordered w-full bg-base-100 text-base-content" 
      />
    </div>
  )

  const renderArrayInput = (name, label) =>{
    const {fields ,append, remove } = useFieldArray({control,name});

    return (
      <div className="form-control w-full max-w-lg mb-4">
        <label className="label">
          <span className="label-text text-base-content">{label}</span>
        </label>
        {fields.map((field ,index) => (
          <div key={field.id} className="flex items-center gap-2 mb-2">
            <input 
            {...register(`${name}.${index}`)}
            className="input input-bordered w-full bg-base-100 text-base-content"
            placeholder={`Enter ${label}...`}
            />
          <button 
          type="button"
          onClick={() => remove(index)}
          className="btn btn-error btn-sm"
          >
          <FaTrash className="w-5 h-5 text-base-content" />
          </button>
          </div>
      ))}
         <button 
          type="button"
          onClick={() => append("")}
          className="btn btn-secondary btn-sm mt-2 flex items-center"
          >
            <FaPlusCircle className="w-5 h-5 mr-1 text-base-content"/> Add {label}
          </button>
          </div>
    );
  };





  function showForm() {
    return (
      <div className="w-full p-10">
        <h1 className="text-4xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <BiBook className="text-primary" /> Resume Form
        </h1>
        <div>
        <form 
        onSubmit={handleSubmit(onSubmit)}
          className="p-6 space-y-6 bg-base-200 rounded-lg text-base-content"
          >
            <h2 className="text-2xl font-bold">Dynamic User Form</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput("personalInfromation.fullName","Full Name")}
              {renderInput("personalInfromation.email","Email","email")}
              {renderInput(
                "personalInfromation.phoneNumber",
                "Phone Number",
                "tel")}
              {renderInput("personalInfromation.location","Location")}
              {renderInput("personalInfromation.linkedin","LinkedIn", "url")}
              {renderInput("personalInfromation.gitHub","GitHub","url")}
              {renderInput("personalInfromation.portfolio","Portfolio","url")}
            </div>

            <div className="form-control w-full">
              <label htmlFor="" className="label">
                <span className="label-text text-base-content">Summary</span>
              </label>
              <textarea 
              {...register("summary")}
              className="textarea textarea-bordered w-full bg-base-100 text-base-content"
              rows={4}
              ></textarea>
            </div>

            <h3 className="text-xl font-semibold mt-6">Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderArrayInput(
                "skills.programmingLanguages",
                "programming Language"
              )}
              {renderArrayInput("skills.frameworks", "Framework")}
              {renderArrayInput("skills.databases", "Database")}
              {renderArrayInput("skills.cloud", "Cloud")}
              {renderArrayInput("skills.devOpsTools", "DevOps Tool")}
              {renderArrayInput("skills.otherSkills", "Other Skill")}
            </div>

            <h3 className="text-xl font-semibold mt-6">Experience</h3>
            {data.experience.map((_,index)=>(
              <div
              key={index}
              className="border p-4 rounded-lg mb-4 bg-base-100 text-base-content"
              >
                {renderArrayInput(`experience.${index}.jobTitle`, "Job Title")}
                {renderArrayInput(`experience.${index}.company`, "Company")}
                {renderArrayInput(`experience.${index}.location`, "Location")}
                {renderArrayInput(`experience.${index}.duration`, "Duration")}
              </div>
            ))}

            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
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
