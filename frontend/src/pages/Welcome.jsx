import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Logout from "../components/Logout";
// import Contacts from "../components/Contacts";
// import Welcome from "../components/Welcome";

export default function Welcome() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);
    const [lastPayment, setLastPayment] = useState(undefined);
    const [isEnrolled, setIsEnrolled] = useState(undefined);
    useEffect( () => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
            navigate("/login");
        }
        else {
        const getUser = async () => {
            try {
                const user = await JSON.parse(
                    localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
                  );
                  setCurrentUser(user);
            }
            catch (error) {
                console.error('Error parsing user data:', error);
              }
        }
        getUser();
    }
    }, []);
    useEffect(() => {
        console.log(typeof(currentUser));
        console.log(currentUser);
        if (currentUser){
            console.log(typeof(currentUser.lastPaymentDate));
            console.log(currentUser.lastPaymentDate);
            // const lastPaymentDateObject = new Date(currentUser.lastPaymentDate);
            setLastPayment(new Date(currentUser.lastPaymentDate));
        }
    }, [currentUser]);
    
    useEffect(() => {
        console.log(lastPayment);
        console.log(typeof(lastPayment));
        if (lastPayment){
            const currentDate = new Date();
            if (lastPayment.getFullYear() === currentDate.getFullYear
                && lastPayment.getMonth() === currentDate.getMonth){
                setIsEnrolled(true);
            }
            else{
                setIsEnrolled(false);
            }
        }
    }, [lastPayment]);

    return(
        // <div>Welcome ${currentUser.name}, <br/>to our Internal Portal.<Logout /></div>
        <div>{currentUser ? 
            <div><h1>Hi! {currentUser.name}</h1> 
              isEnrolled ? <h2>Thank you! You are enrolled </h2> : <h2>You are not enrolled</h2></div>  
            : <h1>Loading...</h1>}
            Welcome to our Internal Portal.
            <Logout />
        </div>
        
    );
}