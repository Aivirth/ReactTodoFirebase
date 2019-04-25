import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../Spinner/Spinner";
import DatePicker from "react-datepicker";

class EditItem extends React.Component {
  state = {
    authorId: "",
    title: "",
    content: "",
    dueDate: null,
    isCompleted: null
  };

  static getDerivedStateFromProps(props, state) {
    const { item } = props;

    if (item && item.authorId !== state.authorId) {
      const { title, content, dueDate, isCompleted, authorId } = item;

      return {
        title,
        content,
        dueDate: dueDate.toDate(),
        isCompleted,
        authorId
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
    const { firestore, history, match } = this.props;
    const updatedItem = { ...this.state };

    firestore
      .collection("items")
      .doc(match.params.id)
      .update({ ...updatedItem })
      .then(() => {
        history.push("/");
      })
      .catch(err => console.log(err));
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

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const id = ownProps.match.params.id;
  const items = state.firestore.data.items;
  const item = items ? items[id] : null;
  return {
    item: item
  };
};

export default compose(
  firestoreConnect([{ collection: "items" }]),
  connect(mapStateToProps)
)(EditItem);

EditItem.propTypes = {
  firestore: PropTypes.object.isRequired
};
