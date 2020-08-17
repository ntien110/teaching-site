import React, { Component } from "react";
import { connect } from "react-redux";

import CustomMdEditor from "./Custom-Md-Editor.component"
import BlogContent from "./BlogContent.component"

class SubjectContent extends Component {
	render() {
		return (
			<div className="subject-content">
				{
					(this.props.currentBlog === null) ?
						<div className="subject-content-info-container">
							<div>
								<label className="subject-content-info"
									style={{
										display: "inline"
									}}
									htmlFor="subject-name">Name: </label>
								<p
									style={{ 
										display: "inline",
										fontSize:"1.5rem",
										marginLeft: "10%"
									}}
									id="subject-name">{this.props.currentSubject.name}</p>
							</div>

							<div>
								<label
									className="subject-content-info"
									style={{ display: "inline" }}
									htmlfor="subject-description">Description: </label>
								<p
									style={{ 
										display: "inline",
										fontSize:"1.5rem",
										marginLeft: "3%"
									}}
									id="subject-description">{this.props.currentSubject.description}</p>
							</div>

						</div>
						:
						(this.props.currentBlog) ?
							<BlogContent />
							:
							<CustomMdEditor />
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	currentBlog: state.subject.subjectContent,
	currentSubject: state.subject.currentSubject
});

const mapDispatchToProps = (dispatch) => ({
	//deleteSubject: (accessToken, subjectId) => dispatch(deleteSubject(accessToken, subjectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubjectContent);
