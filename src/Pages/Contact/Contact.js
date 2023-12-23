import React from "react";
import "./Contact.css";
const Contact = () => {
  return (
    <div className="contact_page">
      <div className="contact_container">
        <div className="contact_heading">
          <h6>Contact as</h6>
          <h3>Get in touch with our team</h3>
          <p>
            Our team is happy to answer your question. Fill out the form and we
            will be in touch as soon as possible
          </p>
        </div>
        <div className="contact_form">
          <div className="contact_form_heading">Contact form</div>
          <form>
            <div className="form_input">
              <p>Name</p>
              <div className="form_input_container">
                <input type="text" />
              </div>
            </div>
            <div className="form_input">
              <p>Email</p>
              <div className="form_input_container">
                <input type="text" />
              </div>
            </div>
            <div className="form_input">
              <p>Subject</p>
              <div className="form_input_container">
                <input type="text" />
              </div>
            </div>
            <div className="form_textarea">
              <p>Massage</p>
              <div className="form_input_container">
                <textarea type="text" />
              </div>
            </div>
            <input type="submit" className="form_contact_submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
