import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import AuthorForm from "./AuthorsForm";
import {newAuthor} from "../../utils";
import Spinner from "../common/Spinner";
import { toast } from 'react-toastify';

function ManageAuthorPage({ authors, actions, history, ...props }) {
// function ManageAuthorPage() {
  const [author, setAuthor] = useState({ ...props.author });
  const [error, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("loading authors failed" + error);
      });
    }else{
      setAuthor({ ...props.author });
    }

    //to run an effect on props changes
  }, [props.author, actions, authors.length]);

  function handleChange(event){
    const { name, value } = event.target;
    setAuthor( prevAuthor =>({
      ...prevAuthor,
      //JavaScript computed property syntax-> [name]:
      [name]: value
    }));
  }

  function formIsValid() {
    const { name } = author;
    const errors = {};

    if (!name) errors.name = "Name is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    actions
      .saveAuthor(author)
      .then(() => {
        toast.success("Author saved.");
        history.push("/courses/all");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return (
    authors.length === 0 ? <Spinner/> :
    <AuthorForm
      errors={error}
      author={author}
      onChange={handleChange}
      onSave={handleSave}
      saving = {saving}
    />
  );
}

ManageAuthorPage.propTypes = {
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export function getAuthorByName(authors, name){
  return authors.find(author => author.name === name) || null;
}

function mapStateToProps(state, ownProps) {
  const name = ownProps.match.params.name;
  const author =
    name && state.authors.length > 0
      ? getAuthorByName(state.authors, name)
      : newAuthor;
  return {
    author: author,
    authors: state.authors
  };
}

// "bindActionCreators" map to props aproach
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      saveAuthor: bindActionCreators(authorActions.saveAuthor, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);