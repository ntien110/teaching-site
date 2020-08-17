import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import SubjectItem from "./Subject-item.component"
import CreateSubjectForm from "./modals/create-subject-form.component"
import Modal from "../../Modal/Modal.component";

import { fetchSubjectList, selectSubject } from "../../../action/subject.action"
import "../../../style/subject-menu.css"

class SubjectMenu extends Component {
    createSubjectModalRef = React.createRef();

    openCreateSubjectModal = () => {
        if (this.createSubjectModalRef.current) {
            return this.createSubjectModalRef.current.openModal();
        }
    };

    closeCreateSubjectModal = () => {
        if (this.createSubjectModalRef.current) {
            return this.createSubjectModalRef.current.closeModal();
        }
    };


    componentDidMount = async () => {
        this.props.fetchSubjectList()
    }

    render() {
        return (
            <div className="grid-container">
                {
                    this.props.subjects.map(subject => (
                        <SubjectItem 
                            key={subject._id} 
                            subject={subject} 
                            selectSubject={() => this.props.selectSubject(subject)} 
                        />
                    ))
                }
                {
                    (this.props.role === "admin") &&
                    (
                        <Fragment>
                            <div className="grid-item" style={{ "backgroundColor": "deepskyblue" }} onClick={this.openCreateSubjectModal}>
                                <div className="subject-item-image-container" style={{ textAlign: "center" }}>
                                    <p style={{ "fontSize": "80px", backgroundColor: "inherit", margin: "0" }}>+</p>
                                </div>
                                <div className="subject-item-info-container">
                                    <p className="subject-item-name">Add new subject</p>
                                </div>
                            </div>

                            <Modal ref={this.createSubjectModalRef}>
                                <CreateSubjectForm
                                    closeModal={this.closeCreateSubjectModal}
                                    openModal={this.openCreateSubjectModal}
                                />
                            </Modal>
                        </Fragment>
                    )
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    accessToken: state.user.accessToken,
    role: state.user.role,
    subjects: state.subject.subjects
});

const mapDispatchToProps = (dispatch) => ({
    fetchSubjectList: () => dispatch(fetchSubjectList()),
    selectSubject: (subject) => dispatch(selectSubject(subject))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubjectMenu);
