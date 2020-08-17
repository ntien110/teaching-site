import React from "react";
import { connect } from "react-redux";

import { createSubjectValidation } from "../../../../../helper/validation.helper";
import { sendEditSubjectRequest } from "../../../../action/subject.action";

import { API } from "../../../../../constants"

class EditSubjectForm extends React.Component {
    state = {
        nameError: "",
        descriptionError: "",
    };

    componentDidMount = () => {
        document.getElementById("subject-name").value = this.props.subject.name
        document.getElementById("subject-description").value = this.props.subject.description
    }

    submitForm = (event) => {
        event.preventDefault();
        let name = this.refs.name.value;
        let image = this.refs.image.files[0];
        let description = this.refs.description.value ? this.refs.description.value : ""

        let validation = createSubjectValidation({ name, image, description });

        let newState = {
            nameError: "",
            descriptionError: "",
        };

        if (validation.error) {
            for (let error in validation.details) {
                let stateName = validation.details[error].path + "Error";
                newState[stateName] = validation.details[error].message;
            }
        } else {
            this.props.sendEditSubjectRequest(this.props.accessToken, name, image, description, this.props.subject._id);
        }

        //this.props.closeModal()
        this.props.closeEdit()
        this.setState(newState);
    };

    componentDidUpdate(nextProps, a) {
        if (nextProps.createSubjectError != "") {
            this.props.openModal()
        }
    }

    render() {
        return (
            <form className="form" onSubmit={this.submitForm} style={{
                position: "relative", zIndex: "99899"
            }}>
                <div className="modal-header">
                    <h1>Create subject</h1>
                    <button
                        type="button"
                        className="close-btn"
                        onClick={this.props.closeEdit}
                    >
                        X
                    </button>
                </div>
                <div className="modal-body">
                    <img
                        style={{
                            height: "5rem",
                            width: "auto",
                            borderRadius: "50%"
                        }}
                        alt=""
                        src={API.image(this.props.subject.imageId)}
                        onError={(e) => e.target.src = "https://www.tibs.org.tw/images/default.jpg"}
                    />
                    <div className="input-wrapper">
                        <label htmlFor="subject-name">Name</label>
                        <input ref="name" name="name" id="subject-name" type="text" />
                        <p className="input-error">{this.state.nameError}</p>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="subject-description">Description</label>
                        <textarea
                            ref="description"
                            name="description"
                            id="subject-description"
                            type="description"
                        />
                        <p className="input-error">{this.state.descriptionError}</p>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="subject-description">Image</label>
                        <input ref="image" name="image" id="subject-image" type="file" />
                    </div>
                    <span id="login-error">{this.props.createSubjectError}</span>
                    <button type="submit" className="button submit-btn">
                        Save
          </button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    createSubjectError: state.subject.createSubjectError,
    accessToken: state.user.accessToken
});

const mapDispatchToProps = (dispatch) => ({
    sendEditSubjectRequest: (accessToken, name, image, description, _id) =>
        dispatch(sendEditSubjectRequest(accessToken, name, image, description, _id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSubjectForm);
