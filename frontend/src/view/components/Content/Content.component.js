import React, { Component } from "react";
import { connect } from "react-redux";

import SubjectMenu from "./Subject-menu/Subject-menu.component"
import SubjectDetail from "./subject-detail/SubjectDetail.component"

class Content extends Component {
	render() {
		return (
			<div className="content">
				{
					(!this.props.currentSubject)
						?
						(
							<SubjectMenu />
						)
						:
						(
							<SubjectDetail />
						)
				}
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

export default connect(mapStateToProps, mapDispatchToProps)(Content);
