import React from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import yogaClass from "../assets/yogaClass.png";

// Styled components
const Container = styled.div`
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;
    height: 100vh;
    background-color: #1f253b;

    .brand{
        text-align: left;
        .img1{
            height: 8rem;
            padding: 1rem;
        }
    }

    .body {
        display: flex;
        width: 100%;
        
        .leftBody{
            flex: 1;
            // text-align: left;
            width: 50%;
        }
        .rightBody{
            flex: 1;
            // text-align: right;
            width: 50%;
            .img2{
                width: 95%;
            }
        }
    }
`;

const Homepage = () => {
  return (
    <Container>
        <div className="brand">
            <img className="img1" src={Logo} alt="logo" />
        </div>
        
        <div className='body'>
            <div className='leftBody'>
                <div className='subHeading'>
                    Your Yoga Class Will Get Here
                
                </div>
                <div className='text'>
                    Sometimes (or much of the time), your body just craves a deep yoga stretch. Our yoga classes are perfect to do right when you wake up in the morning, as a midday. Our classes are also perfect for when you're feeling soreness or tightness in your muscles.
                </div>
            </div>

            <div className='rightBody'>
                <div className='photo'>
                    <img className="img2" src={yogaClass} alt="logo" />
                </div>
                <div className='buttons'>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    </Container>
  );
};

export default Homepage;