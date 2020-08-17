import React, { Component } from "react";
import { connect } from "react-redux";

import SubjectContent from "./SubjectContent.component."
import Navigator from "./navigator.component"

import "../../../style/subject-detail.style.css"

class SubjectDetail extends Component {
	render() {
		return (
			<div className="subject-detail-container">
                <Navigator/>
                <SubjectContent/>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
    currentSubject: state.subject.currentSubject
});

const mapDispatchToProps = (dispatch) => ({
    //deleteSubject: (accessToken, subjectId) => dispatch(deleteSubject(accessToken, subjectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubjectDetail);
