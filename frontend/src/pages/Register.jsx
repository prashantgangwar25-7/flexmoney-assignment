import React, { useState, useEffect } from "react";
import axios from "axios";//used for APIs call to server
import styled from "styled-components";//used to add CSS in 'jsx' file only
import { useNavigate, Link } from "react-router-dom";//used to go to different routes
import Logo from "../assets/logo.png";//our application logo
import { ToastContainer, toast } from "react-toastify";//for beautiful pop-ups(errors)
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";//contains URL for various routes

export default function Register() {
  const navigate = useNavigate();
  //Defines UI for 'toast'
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    name: "",
    email: "",
    DOB: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/welcome");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    // console.log(event.target.value);
  };

  const handleValidation = () => {
    const { password, confirmPassword, name, email, DOB } = values;
    const dobDate = new Date(DOB);
    if (name === "") {
        toast.error("Please write your name", toastOptions);
        return false;
    }
    else if (email === "") {
        toast.error("Email is required", toastOptions);
        return false;
    }
    else if (DOB === "") {
        toast.error("Please select your Date of Birth", toastOptions);
        return false;
    }
    else if (dobDate > new Date()){
        toast.error("Your Date of Birth is wrong", toastOptions);
        return false;
    }
    else if (password !== confirmPassword) {
        toast.error("Password and confirm password should be same", toastOptions);
        return false;
    }
    else if (password.length < 8) {
        toast.error("Password should be greater than 7 characters.", toastOptions);
        return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
        console.log("All Credentials are Correct");
        const { name, email, DOB, password } = values;
        const dobDate = new Date(DOB);
        const { data } = await axios.post(registerRoute, {
            name,
            email,
            dobDate,
            password,
        });
            
        if (data.status === false) {
            toast.error(data.msg, toastOptions);
            console.log("Not saved in DB");
        }
        if (data.status === true) {
            console.log("Successfully added in DB");
            localStorage.setItem(
                process.env.REACT_APP_LOCALHOST_KEY,
                JSON.stringify(data.user)
            );
            navigate("/welcome");
        }
    }
    else{
        console.log("Wrong Credentials");
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
          </div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
            />
          <input
          type="date"
          placeholder="Email"
          name="DOB"
          onChange={(e) => handleChange(e)}
        />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

//CSS on 'FormContainer' using "styled-components" library
const FormContainer = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1rem;
//   align-items: center;
//   background-color: #7032a3;
//   .brand {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
//     img {
//       height: 5rem;
//     }
//     ${'' /* h1 {
//       color: white;
//       text-transform: uppercase;
//     } */}
//   }

//   form {
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
//     background-color: #00000076;
//     border-radius: 2rem;
//     padding: 3rem 5rem;
//   }
//   input {
//     background-color: transparent;
//     padding: 1rem;
//     border: 0.1rem solid #4e0eff;
//     border-radius: 0.4rem;
//     color: white;
//     width: 100%;
//     font-size: 1rem;
//     &:focus {
//       border: 0.1rem solid #997af0;
//       outline: none;
//     }
//   }
//   button {
//     background-color: #4e0eff;
//     color: white;
//     padding: 1rem 2rem;
//     border: none;
//     font-weight: bold;
//     cursor: pointer;
//     border-radius: 0.4rem;
//     font-size: 1rem;
//     text-transform: uppercase;
//     &:hover {
//       background-color: #7032a3;
//     }
//   }
//   span {
//     color: white;
//     text-transform: uppercase;
//     a {
//       color: #4e0eff;
//       text-decoration: none;
//       font-weight: bold;
//     }
//   }
`;