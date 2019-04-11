import React, { Component } from "react";
import { Link } from "react-router-dom";

class AddItem extends Component {
  state = {
    title: "",
    content: ""
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back to List
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  minLength="2"
                  onChange={this.onInputChange}
                  value={this.state.title}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="content"
                  minLength="5"
                  onChange={this.onInputChange}
                  value={this.state.content}
                  required
                />
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default AddItem;
