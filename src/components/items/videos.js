import React, { Component } from "react";
import "video-react/dist/video-react.css";
import { Player } from "video-react";

// Module to stream all videos

class Videos extends Component {
  state = {
    Data: [],
    region: "ca-central-1",
    bucketName: "drishti.bucket",
  };

  // Fetch videos from database
  componentDidMount() {
    const result = fetch(
      `http://localhost/video-streaming/get_data.php?video`,
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
    // store user name from local storage
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
            <div className="col-sm-10 pt-2">
              {filtered_data.map((c) => (
                <div className="pt-5" key={c.id}>
                  <Player
                    key={c.id}
                    width="500"
                    hight="400"
                    playsInline
                    src={`https://s3.${this.state.region}.amazonaws.com/${this.state.bucketName}/${c.file_name}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Videos;
