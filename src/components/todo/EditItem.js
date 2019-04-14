import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../Spinner/Spinner";
import DatePicker from "react-datepicker";

class EditItem extends React.Component {
  state = {
    id: "",
    title: "",
    content: "",
    dueDate: null,
    isCompleted: null
  };

  static getDerivedStateFromProps(props, state) {
    const { item } = props;

    if (item && item.id !== state.id) {
      const { title, content, dueDate, isCompleted, id } = item;

      return {
        title,
        content,
        dueDate: dueDate.toDate(),
        isCompleted,
        id
      };
    }

    return null;
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onDateChange = date => {
    this.setState({
      dueDate: date
    });
  };

  onIsCompleteInput = e => {
    e.preventDefault();
    const { name, value } = e.target;

    this.setState({
      [name]: !JSON.parse(value)
    });
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { firestore, history, item } = this.props;
    const updatedItem = { ...this.state };

    firestore
      .update({ collection: "items", doc: item.id }, updatedItem)
      .catch(err => console.log(err))
      .then(history.push("/"));
  };

  render() {
    const { item } = this.props;
    let output = <Spinner />;

    if (item) {
      let completeToggle = (
        <button
          type="text"
          className={`btn btn-${this.state.isCompleted ? "success" : "danger"}`}
          name="isCompleted"
          value={this.state.isCompleted}
          onClick={this.onIsCompleteInput}
        >
          {this.state.isCompleted ? "Completed" : "Not Completed"}
        </button>
      );

      const { title, content, dueDate } = this.state;
      output = (
        <div className="card">
          <div className="card-header">Edit Item</div>
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
                  value={title}
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
                  value={content}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dueDate">Due</label>

                <div className="d-block">
                  <DatePicker
                    inline
                    selected={dueDate ? dueDate : new Date()}
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

              <div className="form-group">
                <label htmlFor="isCompleted">Is Completed? </label>{" "}
                {completeToggle}
              </div>

              <input
                type="submit"
                value="Submit"
                className="btn-block btn btn-success"
              />
            </form>
          </div>
        </div>
      );
    }
    return (
      <>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back to List
            </Link>
          </div>
        </div>
        {output}
      </>
    );
  }
}

export default compose(
  firestoreConnect(props => [
    { collection: "items", storeAs: "item", doc: props.match.params.id }
  ]),

  connect(({ firestore: { ordered } }, props) => ({
    item: ordered.item && ordered.item[0]
  }))
)(EditItem);

EditItem.propTypes = {
  firestore: PropTypes.object.isRequired
};
