import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Styles.css" 

const Category = props => {

  const activeStyle = {
    color: "#fff",
    backgroundColor: "#007bff",
    borderRadius: 3.25
  };
  
    // const overLink = {}

  function  rendercategories({categories}){
    return categories.map((category, index) => {
      return (
        <li key={category} className="nav-item">
          <NavLink to={"/courses/" + category} activeStyle={activeStyle} className="nav-link  overme">{category}</NavLink>
        </li>
      );
    })
  }
   
  return <ul className="nav flex-sm-column">{rendercategories(props)}</ul>
}

Category.propTypes = {
  categories: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  let categories =
    state.courses.length === 0
      ? []
      : state.courses.map(({ category }) => {
          return category;
        });
  return {
    categories: [...new Set(categories)]
  };
}

export default connect(mapStateToProps)(Category);;
