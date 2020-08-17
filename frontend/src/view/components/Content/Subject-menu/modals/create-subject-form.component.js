import React from "react";
import { connect } from "react-redux";

import { createSubjectValidation } from "../../../../../helper/validation.helper";
import { sendCreateSubjectRequest } from "../../../../action/subject.action";

class CreateSubjectForm extends React.Component {
    state = {
        nameError: "",
        descriptionError: "",
    };

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
            this.props.sendCreateSubjectRequest(this.props.accessToken, name, image, description);
        }

        this.props.closeModal()
        this.setState(newState);
    };

    componentDidUpdate(nextProps, a) {
        if (nextProps.createSubjectError != "") {
            this.props.openModal()
        }
    }

    render() {
        return (
            <form className="form" onSubmit={this.submitForm}>
                <div className="modal-header">
                    <h1>Create subject</h1>
                    <button
                        type="button"
                        className="close-btn"
                        onClick={this.props.closeModal}
                    >
                        X
                    </button>
                </div>
                <div className="modal-body">
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
                        Create
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
    sendCreateSubjectRequest: (accessToken, name, image, description) =>
        dispatch(sendCreateSubjectRequest(accessToken, name, image, description)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSubjectForm);
