import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { deleteSubject } from "../../../action/subject.action"
import { API } from "../../../../constants"

import EditSubjectForm from "./modals/edit-subject-form.component"

class SubjectItem extends Component {
    state = {
        isOptionOpen: false,
        showEdit: false
    };

    handleOptionClick = (e) => {
        e.stopPropagation()
        this.setState(state => {
            return {
                isOptionOpen: !state.isOptionOpen,
            };
        });
    };

    handleDeleteSubject = (e) => {
        e.stopPropagation()
        this.props.deleteSubject(this.props.accessToken, this.props.subject._id)
    }

    handleEditSubject = (e) => {
        e.stopPropagation()
        this.setState({ showEdit: true })
    }

    closeEdit = () => {
        this.setState({ showEdit: false })
    }

    render() {
        return (
            <Fragment>
                <div className="grid-item" onClick={this.props.selectSubject}>
                    <div className="subject-item-image-container">
                        <img
                            className="subject-item-image"
                            alt=""
                            src={API.image(this.props.subject.imageId)}
                            onError={(e) => e.target.src = "https://www.tibs.org.tw/images/default.jpg"}
                        />
                    </div>
                    <div className="subject-item-info-container">
                        <p className="subject-item-name">{this.props.subject.name}</p>
                        {
                            (this.props.role === "admin") ? (
                                <Fragment>
                                    <button type="button" className="subject-item-select" onClick={this.handleOptionClick}>
                                        ☰
                        </button>
                                    {this.state.isOptionOpen && (
                                        <div className="dropdown">
                                            <ul>
                                                <li onClick={this.handleEditSubject}>Edit</li>
                                                <li onClick={this.handleDeleteSubject}>Delete</li>
                                            </ul>
                                        </div>
                                    )}
                                </Fragment>
                            ) : ""
                        }
                    </div>

                </div>
                {
                    this.state.showEdit && <EditSubjectForm closeEdit={() => this.closeEdit()} subject={this.props.subject} />
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    accessToken: state.user.accessToken,
    role: state.user.role
});

const mapDispatchToProps = (dispatch) => ({
    deleteSubject: (accessToken, subjectId) => dispatch(deleteSubject(accessToken, subjectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubjectItem);