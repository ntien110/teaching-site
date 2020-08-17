import React, { Component } from "react";
import { connect } from "react-redux";

import { setSubjectContent } from "../../../action/subject.action"


class BlogItem extends Component {
    render() {
        let isSelected=""
        if (this.props.selectedBlog && this.props.selectedBlog._id === this.props.blog._id){
            isSelected=" selected"
        }
        return (
            <div className={"blog-item"+ isSelected }onClick={()=>this.props.selectSubject(this.props.blog)}>
                <p className="title">{this.props.blog.title}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedBlog: state.subject.subjectContent
});

const mapDispatchToProps = (dispatch) => ({
    selectSubject: (blog) => dispatch(setSubjectContent(blog))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogItem);
