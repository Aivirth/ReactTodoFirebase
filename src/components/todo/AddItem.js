import React, { Component } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import { addItem } from "../../redux/actions";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

class AddItem extends Component {
  state = {
    title: "",
    content: "",
    startDate: new Date()
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { addItem } = this.props;
    const newItem = { ...this.state };
    newItem.isCompleted = false;
    newItem.dueDate = newItem.startDate;
    delete newItem.startDate;

    addItem(newItem);
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
          <div className="card-header">Add Item</div>
          <div className="card-body">
            <form onSubmit={this.onFormSubmit}>
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

              <div className="form-group">
                <label htmlFor="dueDate">Due</label>

                <div className="d-block">
                  <DatePicker
                    inline
                    selected={this.state.startDate}
                    onChange={this.onDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                    name="dueDate"
                  />
                </div>
              </div>

              <input
                type="submit"
                value="Create"
                className="btn-block btn btn-primary"
              />
            </form>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItem: item => dispatch(addItem(item))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddItem);

AddItem.propTypes = {
  firestore: PropTypes.object.isRequired
};
