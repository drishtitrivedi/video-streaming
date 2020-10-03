import React, { Component } from "react";

import "video-react/dist/video-react.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

// Module to stream all Audios

class Audios extends Component {
  state = {
    Data: [],
    region: "ca-central-1",
    bucketName: "drishti.bucket",
  };

  componentDidMount() {
    const result = fetch(
      `http://localhost/video-streaming/get_data.php?audio`,
      {
        headers: [["Content-Type", "text/plain"]],
        mode: "cors",
      }
    );
    result
      .then((response) => response.json())
      .then((data) => {
        this.setState({ Data: data });
      });
  }

  render() {
    const { Data } = this.state;
    const userData = localStorage.getItem("userRole");
    let filtered_data = {};

    // filteration based on user role
    filtered_data = Data.filter((d) => d.acl === "public-read");
    if (userData === "owner") {
      filtered_data = Data;
    }
    if (userData === "paid") {
      filtered_data = Data.filter((d) => d.acl !== "log-delivery-write")
        .filter((d) => d.acl !== "bucket-owner-full-control")
        .filter((d) => d.acl !== "bucket-owner-read")
        .filter((d) => d.acl !== "private");
    }
    if (userData === "unpaid") {
      filtered_data = Data.filter((d) => d.acl !== "log-delivery-write")
        .filter((d) => d.acl !== "bucket-owner-full-control")
        .filter((d) => d.acl !== "bucket-owner-read")
        .filter((d) => d.acl !== "private")
        .filter((d) => d.acl !== "aws-exec-read");
    }

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8 pt-2">
              {filtered_data.map((c) => (
                <div className="pt-5" key={c.id}>
                  <AudioPlayer
                    preload="none"
                    src={`https://s3.${this.state.region}.amazonaws.com/${this.state.bucketName}/${c.file_name}`}
                    onPlay={(e) => console.log("onPlay")}
                  />
                </div>
              ))}
            </div>
            <div className="col-sm-2"></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Audios;
