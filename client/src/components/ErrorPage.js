import React, { Component } from "react";

export default class ErrorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      pause: true
    };
    this.url = "../../../bgsound01.mp3";
    this.audio = new Audio(this.url);
  }

  play = () => {
    this.setState({ play: true, pause: false });
    this.audio.play();
  };

  pause = () => {
    this.setState({ play: false, pause: true });
    this.audio.pause();
  };

  render() {
    return (
      <div id="error">
        <h2>this page should not exist....!!!</h2>
        <div id="errorLogo">
          <button onClick={this.play}>
            <img src="../../../logo3.png" alt="logo" />
          </button>
        </div>

        <button onClick={this.pause}>Pause</button>
      </div>
    );
  }
}
