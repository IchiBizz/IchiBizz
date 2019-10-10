import React, { Component } from "react";
import "../App.css";
import WebFont from "webfontloader";
import SignUp from "./SignUp";
import Login from "./Login";

export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <video id="bgVideo" loop autoPlay>
          <source
            src="https://storage.coverr.co/videos/Big-City-Life?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjExNDMyN0NEOTRCMUFCMTFERTE3IiwiaWF0IjoxNTcwNzAxNjI0fQ.v6u1pHcxWVoP-cfZp6xOFozFodMHrua3E5SzF9fcTr0"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="main">
          <div className="contents_inner">
            <div id="titleimg">
              <img src="../../logo1.png" alt="logo" />
            </div>
            <h2>i need small text here</h2>
          </div>
          <section className="loginbox">
            <div className="logincontainer">
              
              <SignUp />
              <Login />
            </div>
            <div id="logImg">
              <img src="../../logo3.png" alt="logo" />
            </div>
          </section>
        </div>
      </div>
    );
  }
}
