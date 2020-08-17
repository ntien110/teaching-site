import React, { Component } from "react";
import { connect } from "react-redux";

import { unselectSubject, setSubjectContent } from "../../../action/subject.action"
import { API } from "../../../../constants"

import BlogItem from "./BlogItem.component"

class Navigator extends Component {

    render() {
        return (
            <div className="navigator">
                <div className="subject-info">
                    <button className="button previous" onClick={this.props.unselectSubject}>&#8249;</button>
                    <img
                        className="subject-image"
                        alt=""
                        src={API.image(this.props.currentSubject.imageId)}
                        onError={(e) => e.target.src = "https://www.tibs.org.tw/images/default.jpg"}
                    />
                    <p className="subject-name"> {this.props.currentSubject.name} </p>
                </div>
                <div className="blog-list">
                    {
                        JSON.parse(localStorage.getItem("blogs")).map((blog) => (
                            <BlogItem blog={blog} key={blog._id} />
                        ))
                    }
                    {
                        (this.props.role === "admin") && (
                            <div
                                className={"blog-item"}
                                onClick={() => this.props.openEditor()}
                                style={{ backgroundColor: "#f76a8c" }}>
                                <p className="title">+ Create new</p>
                            </div>)
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    role: state.user.role,
    currentSubject: state.subject.currentSubject
});

const mapDispatchToProps = (dispatch) => ({
    unselectSubject: () => dispatch(unselectSubject()),
    openEditor: () => dispatch(setSubjectContent(undefined))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
