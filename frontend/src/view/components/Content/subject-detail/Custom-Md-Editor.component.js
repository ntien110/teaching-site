// import react, react-markdown-editor-lite, and a markdown parser you like
import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import { API } from "../../../../constants"
import { sendCreateBlogRequest } from "../../../action/subject.action"
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import "../../../style/blog-editor.style.css"

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class CustomMdEditor extends Component {

	state = {
		title: "",
		content: "",
		images: []
	}

	handleEditorChange = ({ html, text }) => {
		this.setState({ content: text });
	};

	handleImageUpload = async (file, callback) => {
		const data = new FormData();
		data.append('image', file);
		let response = await fetch(API.imageOnlyUpload, {
			method: 'POST',
			credentials: "include",
			headers: {
				'Accept': 'application/json'
			},
			body: data
		})
		if (response.status === 200) {
			let fileData = await response.json()
			this.setState({ image: this.state.images.push(API.image(fileData.file.id)) })
			callback(API.image(fileData.file.id))
		}
		else {
			throw response.status
		}
	}

	handleTitleChange = (event) => {
		this.setState({ title: event.target.value });
	}

	handleSave = () => {
		this.props.saveBlog(
			this.props.accessToken,
			this.state.title,
			this.state.content,
			this.state.images,
			this.props.currentSubject._id
		)
	}

	render() {
		return (
			<div className="blog-editor">
				<h1>Create new blog</h1>
				<p>Blog title: </p>
				<input className="title-inp" type="text" onChange={this.handleTitleChange} />

				<p>Blog content: </p>
				<MdEditor
					value=""
					style={{ height: "500px" }}
					renderHTML={(text) => mdParser.render(text)}
					onChange={this.handleEditorChange}
					onImageUpload={this.handleImageUpload}
				/>
				<button className="btn save-btn" onClick={this.handleSave}>
					Save
				</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	accessToken: state.user.accessToken,
	currentSubject: state.subject.currentSubject
});

const mapDispatchToProps = (dispatch) => ({
	saveBlog:
		(accessToken, title, content, images, subjectId) =>
			dispatch(sendCreateBlogRequest(accessToken, title, content, images, subjectId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomMdEditor);
