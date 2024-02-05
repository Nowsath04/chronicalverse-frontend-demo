import React, { useState } from "react";
import "./Contact.css";
import axios from "axios";
import { API_URL } from "../../constants/userConstants";
import { toast } from "react-toastify";
const Contact = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "",
  })

  console.log(contactData.category);

  const handleChange = (e) => {

    const { name, value } = e.target
    setContactData({
      ...contactData, [name]: value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!contactData.name) {
      return toast.error("please enter name")
    }
    if (!contactData.email) {
      return toast.error("please enter email")
    }
    if (!contactData.subject) {
      return toast.error("please enter subject")
    }
    if (!contactData.message) {
      return toast.error("please enter message")
    }
    if (!contactData.category) {
      return toast.error("please enter category")
    }
    try {
      const data = await axios.post(`${API_URL}/getcontact`, contactData, { withCredentials: true })
      toast.success("Thank you for contacting us")
      setContactData({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: ""
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="contact_page">
      <div className="contact_container">
        <div className="contact_heading">
          <h6>Contact us</h6>
          <h3>Get in touch with our team</h3>
          <p>
            Our team is happy to answer your question. Fill out the form and we
            will be in touch as soon as possible
          </p>
        </div>
        <div className="contact_form">
          <div className="contact_form_heading">Contact form</div>
          <form onSubmit={handleSubmit}>
            <div className="form_input">
              <p>Name</p>
              <div className="form_input_container">
                <input type="text" value={contactData.name} name="name" onChange={handleChange} />
              </div>
            </div>
            <div className="form_input">
              <p>Email</p>
              <div className="form_input_container">
                <input type="text" value={contactData.email} name="email" onChange={handleChange} />
              </div>
            </div>
            <div className="form_input">
              <p>Subject</p>
              <div className="form_input_container">
                <input type="text" value={contactData.subject} name="subject" onChange={handleChange} />
              </div>
            </div>
            <div className="form_input">
              <p>Category</p>
              <div className="form_input_container_select">
                <select value={contactData.category} name="category" onChange={handleChange}>
                  <option value="" disabled>Select a category</option>
                  <option value="Whitelist user">Whitelist user</option>
                  <option value="not Whitelist user">Not Whitelist user</option>
                </select>
              </div>
            </div>
            <div className="form_textarea">
              <p>Massage</p>
              <div className="form_input_container">
                <textarea type="text" value={contactData.message} name="message" onChange={handleChange} />
              </div>
            </div>
            <input type="submit" className="form_contact_submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;