import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, deleteUser } from "../../actions/authActions";
import moment from 'moment'; //npm install moment --save (CLIENT)
import axios from 'axios';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modal: false,
        roomTitle: '',
        createdBy: ''
    };

    this.toggle = this.toggle.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  toggle() {
    this.setState({
        modal: !this.state.modal
    });
  }

  onFormSubmit() {
    const chatData = this.state;
    axios.post('/chats/create', chatData)
        .then(res => {
            //some response msg
        })
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  onDeleteClick = e => {
    if (window.confirm("Do you want to delete your account?")) {
      e.preventDefault();
      this.props.deleteUser();
    }
  }

  componentDidMount() {
    document.body.classList.add("background-white");
  }

  render() {
    const { user } = this.props.auth;
    return (



        <div className="container valign-wrapper">
        <div className="col s12 center-align">
        <h1 style={{ fontFamily: "Urbana" }}>Welcome to School Share 🎉</h1>

          <img id="userAvatar" style={{
            verticalAlign: "middle",
            borderRadius: "50%",
            width: "150px",
            height: "150px",
            textAlign: "center",
            marginTop: "25px"
          }} src={user.avatar} />

          <p class="userName" style={{
            fontWeight: "bold",
            fontSize: "250%"
          }}>{user.name}</p>

          <p class="userEmail" style={{
            // fontWeight: "bold",
            fontSize: "150%"
          }}>Email: {user.email}</p>

          <p class="userDate" style={{
            // fontWeight: "bold",
            fontSize: "150%"
          }}>Joined Date: {moment(user.date).format('MM/DD/YYYY')}</p>
          <p class="userDesc" style={{
            // fontWeight: "bold",
            fontSize: "150%"
          }}>Bio: {user.description}</p>
          <p> </p>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "2rem"
            }}
            onClick={this.onLogoutClick}
            className="btn btn-large waves-effect waves-light hoverable green accent-3"
          >
            Logout
            </button>
            <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "2rem",
              marginLeft: "1rem"
            }}
            //onClick={this.onProfileClick}
            className="btn btn-large waves-effect waves-light hoverable green accent-3"
          >
            Edit Profile
            </button>

          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "2rem",
              marginLeft: "1rem"
            }}
            onClick={this.onDeleteClick}
            className="btn btn-large waves-effect waves-light hoverable green accent-3"
          >
            Delete Account
            </button>
            <div>
                  <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel} Create Chat Room</Button>
                  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                      <ModalHeader toggle={this.toggle}>New Chat Room</ModalHeader>
                      <Form onSubmit={this.onFormSubmit}>
                          <ModalBody>
                              <FormGroup>
                                  <Label for="inputRoomTitle">Chat Room Title:</Label>
                                  <Input type="text" name="roomTitle" id="inputRoomTitle" placeholder="Required field"
                                         value={this.state.roomTitle} onChange={e => this.setState({ roomTitle: e.target.value })}/>
                              </FormGroup>
                              <FormGroup>
                                  <Label for="inputCreatedBy">Your Name:</Label>
                                  <Input type="text" name="createdBy" id="inputCreatedBy" placeholder="Required field"
                                         value={this.state.createdBy} onChange={e => this.setState({ createdBy: e.target.value })}/>
                              </FormGroup>
                          </ModalBody>
                          <ModalFooter>
                              <Button color="primary">Create</Button>{' '}
                              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                          </ModalFooter>
                      </Form>
                  </Modal>
              </div>
            </div>
        </div>




/*
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Hey there,</b> {user.name.split(" ")[0]}
                <p className="flow-text grey-text text-darken-3">
                  This is your user profile. Updates are coming soon! </p>
                <p className="flow-text grey-text text-darken-3"> {" "}
                  <span style={{ fontFamily: "Urbana" }}>Welcome to School Share</span> 🎉
              </p>
              </h4>
            </div>
          </div>
        </div> */

    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser, deleteUser }
)(Dashboard);
