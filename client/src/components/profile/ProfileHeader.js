import React, { Component } from 'react';
//import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3 center-align">
            <div className="row">
              <div className="col-4 col-md-3 m-auto" style={{ padding: "30px"}}>
              <div class="crop">
                <img style={{
                  verticalAlign: "middle",
                  borderRadius: "50%",
                  width: "200px",
                  height: "200px",
                  textAlign: "center",
                  marginTop: "25px"

                }}
                  //className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
