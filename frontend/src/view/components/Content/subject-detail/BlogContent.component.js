import React, { Component } from "react";
import { connect } from "react-redux";

import { } from "../../../action/subject.action"
import MarkdownIt from "markdown-it";


class BlogContent extends Component {
    md = new MarkdownIt()
    render() {
        let content = this.md.render(this.props.selectedBlog.content)
        return (
            <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: content.replace(/(<? *script)/gi, 'illegalscript') }}>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedBlog: state.subject.subjectContent
});

const mapDispatchToProps = (dispatch) => ({
    //selectSubject: (blog) => dispatch(setSubjectContent(blog))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogContent);
