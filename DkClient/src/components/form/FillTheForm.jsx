import React, { useState } from "react";
import axios from "axios";
import "./FillTheForm.css";
import { toast } from "react-toastify";
;
import { useDispatch, useSelector } from "react-redux";
// import { createuserAsync } from '../../features/authSlice';
import jsPDF from "jspdf";
const FillTheForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reference: "",
    location: "",
    paidAmount: "",
    designation: "",
    companyName: "",
  });

  // const user = useSelector((state) => state.auth.user)
  const user = {
    role: "user",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // State and event handlers for the first dropdown
  const [isOpen1, setIsOpen1] = useState(false);

  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };

  // State and event handlers for the second dropdown
  const [isOpen2, setIsOpen2] = useState(false);

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
  };

  // Convert the form to a PDF
  const convertToPdf = async (e) => {
    e.preventDefault();
    console.log(formData);
  
    try {
      // Send POST request to the server to generate the PDF
      const response = await fetch("/api/downloadPDF", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send formData as JSON
      });
  
      // Log the status and response for debugging
      console.log('Response status:', response.status);
      console.log('Response body:', await response.text());
  
      // Check if the response is OK
      if (response.ok) {
        // Get the PDF blob from the response
        const blob = await response.blob();
  
        // Create a new jsPDF document
        const doc = new jsPDF();
  
        // Use the PDF blob data
        doc.addImage(URL.createObjectURL(blob), "PDF", 0, 0, 210, 297); // Adjust dimensions if needed
        doc.save("DK_Recruitment_Form.pdf");
  
        toast.success("Form converted to PDF successfully");
      } else {
        toast.error(`Error in API request: ${response.statusText}`);
      }
    } catch (error) {
      console.log("API request failed:", error);
      toast.error("Error in API request: " + error.message);
    }
  };
  

  return (
    <>
      {user.role && (
        <section className="form-fill text-gray-900 bg-gray-200">
          <div className="container py-12 mx-auto ">
            <h1 className="md:mx-4 text-3xl sm:text-4xl lg:text-4xl mb-4 font-medium text-gray-900 text-center md:text-start">
              DK Recruitment Form
            </h1>
            <p className="md:mx-4 mb-8 sm:text-lg lg:text-xl leading-relaxed text-center md:text-start">
              Fill all the required details here
            </p>
            <form className="mx-2 sm:mx-3 md:mx-4">
              {/* FIRST ROW */}
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Name"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@gmail.com"
                    required
                  />
                </div>
              </div>

              {/* SECOND ROW */}
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="mb-6">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="reference"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Reference
                  </label>
                  <input
                    type="text"
                    id="reference"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Reference Person Name"
                    required
                  />
                </div>
              </div>

              {/* THIRD ROW */}
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="mb-6">
                  <label
                    htmlFor="location"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Location"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="paidAmount"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                  >
                    Paid Amount
                  </label>
                  <input
                    type="number"
                    id="paidAmount"
                    name="paidAmount"
                    value={formData.paidAmount}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Paid Amount"
                    required
                  />
                </div>
              </div>
              {/* FOURTH ROW */}
              <div className="grid md:grid-cols-2 md:gap-10">
                {/* First dropdown */}
                <div className="relative z-0 w-full mb-6 group">
                  <button
                    onClick={toggleDropdown1}
                    className="dropdown-setting text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-md py-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                  >
                    {formData.designation || "Choose Designation"}
                    <svg
                      className="w-2.5 h-2.5 ml-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  <div
                    className={`z-10 ${
                      isOpen1 ? "" : "hidden"
                    }  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dropdown-menu-setting-one`}
                  >
                    <ul
                      className="py-2 text-lg text-gray-700 dark:text-gray-200 "
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={(e) => {
                            e.preventDefault();
                            setFormData({
                              ...formData,
                              designation: "Frontend Developer",
                            });
                            toggleDropdown1();
                          }}
                        >
                          Frontend Developer
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={(e) => {
                            e.preventDefault();
                            setFormData({
                              ...formData,
                              designation: "Backend Developer",
                            });
                            toggleDropdown1();
                          }}
                        >
                          Backend Developer
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover.bg-gray-100 dark:hover.bg-gray-600 dark:hover.text-white"
                          onClick={(e) => {
                            e.preventDefault();
                            setFormData({ ...formData, designation: "SEO" });
                            toggleDropdown1();
                          }}
                        >
                          SEO
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* Second dropdown */}
                <div className="relative z-0 w-full mb-6 group">
                  <button
                    onClick={toggleDropdown2}
                    className="dropdown-setting text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-md py-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
                    type="button"
                  >
                    {formData.companyName || "Choose Company Name"}
                    <svg
                      className="w-2.5 h-2.5 ml-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  <div
                    className={`z-10 ${
                      isOpen2 ? "" : "hidden"
                    }  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dropdown-menu-setting-two`}
                  >
                    <ul
                      className="py-2 text-lg text-gray-700 dark:text-gray-200 "
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={(e) => {
                            e.preventDefault();
                            setFormData({
                              ...formData,
                              companyName: "Social Swirl",
                            });
                            toggleDropdown2();
                          }}
                        >
                          Social Swirl
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover.bg-gray-100 dark:hover.bg-gray-600 dark:hover.text-white"
                          onClick={(e) => {
                            e.preventDefault();
                            setFormData({
                              ...formData,
                              companyName: "DK Recruitment",
                            });
                            toggleDropdown2();
                          }}
                        >
                          DK Recruitment
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover.bg-gray-100 dark:hover.bg-gray-600 dark:hover.text-white"
                          onClick={(e) => {
                            e.preventDefault();
                            setFormData({ ...formData, companyName: "SEO" });
                            toggleDropdown2();
                          }}
                        >
                          SEO
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-md px-6 py-3 text-center mr-2 mb-2">Submit</button> */}
              <div className="buttons sm:text-center md:text-start text-start">
                <button
                  type="submit"
                  onClick={convertToPdf}
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-md px-6 py-3 text-center mr-2 mb-2"
                >
                  Convet to Pdf
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default FillTheForm;
