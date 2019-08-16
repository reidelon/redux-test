import React from "react";
import { Link} from "react-router-dom";

const HomePage = () => (
    <div className="jumbotron">
      <h1 className="display-4">Administration</h1>
      <p className="lead">React, Redux and React Router.</p>
      <hr className="my-4"/>
      <p className="lead">
        <Link to="/about" className="btn btn-primary btn-lg">
                Learn more
        </Link>
      </p>
    </div>
);

export default HomePage;