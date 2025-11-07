import React from 'react'
import './LandingPage.css'
import { Button, Container } from 'react-bootstrap'
function LandingPage() {
  return (
    <>
      <div className="main-container">
        <div className="intro-text">
          <div className='content'>
            <h1 className="title">Welcom to the Note Zipper</h1>
            <p className="subtitle">One safe place for all your notes...</p>
          </div>
          <div className='buttonContainer'>
            <a href="/login">
              <Button size="lg" className="landingButton">
                Login
              </Button>
            </a>
            <a href="/register">
              <Button size="lg" className="landingButton" variant='outline-primary'>
                Sign Up
              </Button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage
