import { useState } from "react";
import { FiSend, FiTrash2 } from "react-icons/fi";
import { generateResume } from "../api/ResumeService";
import { useForm, useFieldArray } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { FaTrash, FaBrain } from "react-icons/fa";
import { BiBook } from "react-icons/bi";
import Resume from "../components/Resume";


const GenerateResume = () => {

  const [showFormUI, setShowFormUI] = useState(false)
  const [showResumeUI, setShowResumeUI] = useState(false)
  const [showPromptInput, setShowPromptInput] = useState(true)

  const [data, setData] = useState({
    personalInformation: {},
    summary: "",
    skills: {
      programmingLanguages: [],
      frameworks: [],
      databases: [],
      cloud: [],
      devOpsTools: [],
      otherSkills: [],
    },
    experience: [],
    education: [],
    certifications: [],
    projects: [],
    languages: [],
    interests: [],
  });
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: data,
  });

  // Handle form submit
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setData({ ...data });
    setShowFormUI(false);
    setShowPromptInput(false);
    setShowResumeUI(true);
  }
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);




  // End of edit the input options
  const handleGenerate = async () => {
    console.log("Generating Resume with description:", description);
    try {
      setLoading(true);
      const responseData = await generateResume(description);
      console.log(responseData.data);
      reset(responseData.data);
      setShowFormUI(true);
      setShowPromptInput(false);
      setShowResumeUI(false);
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

  const renderInput = (name, label, type = "text") => (
    <div className="form-control w-full  mb-4">
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

  const renderArrayInput = (name, label) => {
    const { fields, append, remove } = useFieldArray({ control, name });

    return (
      <div className="form-control w-full  mb-4">
        <label className="label">
          <span className="label-text text-base-content">{label}</span>
        </label>
        {fields.map((field, index) => (
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
          <FaPlusCircle className="w-5 h-5 mr-1 text-base-content" /> Add {label}
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
            className="max-w-4xl w-full space-y-6 bg-base-200 p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
              <BiBook className="text-primary" /> Dynamic User Form
            </h2>

            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput("personalInformation.fullName", "Full Name")}
              {renderInput("personalInformation.email", "Email", "email")}
              {renderInput("personalInformation.phoneNumber", "Phone Number", "tel")}
              {renderInput("personalInformation.location", "Location")}
              {renderInput("personalInformation.linkedIn", "LinkedIn", "url")}
              {renderInput("personalInformation.gitHub", "GitHub", "url")}
              {renderInput("personalInformation.portfolio", "Portfolio", "url")}
            </div>

            {/* Summary */}
            <h3 className="text-xl font-semibold">Summary</h3>
            <textarea
              {...register("summary")}
              className="textarea textarea-bordered w-full bg-base-100 text-base-content"
              rows={4}
            ></textarea>

            {/* Skills */}
            <h3 className="text-xl font-semibold">Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderArrayInput("skills.programmingLanguages", "Programming Language")}
              {renderArrayInput("skills.frameworks", "Framework")}
              {renderArrayInput("skills.databases", "Database")}
              {renderArrayInput("skills.cloud", "Cloud")}
              {renderArrayInput("skills.devOpsTools", "DevOps Tool")}
              {renderArrayInput("skills.otherSkills", "Other Skill")}
            </div>

            {/* Experience */}
            <h3 className="text-xl font-semibold">Experience</h3>
            {renderArrayInput("experience", "Experience")}

            {/* Education */}
            <h3 className="text-xl font-semibold">Education</h3>
            {renderArrayInput("education", "Education")}

            {/* Certifications */}
            <h3 className="text-xl font-semibold">Certifications</h3>
            {renderArrayInput("certifications", "Certification")}

            {/* Projects */}
            <h3 className="text-xl font-semibold">Projects</h3>
            {renderArrayInput("projects", "Project")}

            {/* Languages */}
            <h3 className="text-xl font-semibold">Languages</h3>
            {renderArrayInput("languages", "Language")}

            {/* Interests */}
            <h3 className="text-xl font-semibold">Interests</h3>
            {renderArrayInput("interests", "Interest")}

            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
        </div>
        {/* Personal Information End.. */}
      </div>
    )
  }

  function showResume() {
    return <Resume data={data} />;
  }

  return (
    <div className="flex flex-col gap-3 items-center justify-center min-h-screen bg-gradient-to-r from-primary/10 via-base-200 to-secondary/10">
      {showFormUI && showForm()}
      {showPromptInput && showInputField()}
      {showResumeUI && showResume()}
    </div>
  );
};

export default GenerateResume;
