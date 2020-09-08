import React, { Component } from "react";
// import "./Announcement-Style.css";

class Announcement extends Component {
  render() {
    let dialog = (
      <div className="Announcement-container">
        <div>{this.props.children}</div>
        <button onClick={this.props.onClose}>x</button>
      </div>
    );

    if (!this.props.isOpen) {
      dialog = null;
    }
    return <div>{dialog}</div>;
  }
}

export default Announcement;
