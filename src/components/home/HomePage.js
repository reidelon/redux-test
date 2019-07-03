import React from "react";
import { Link} from "react-router-dom";

const HomePage = () => (
    <div className="jumbutrom">
        <h1>Administration</h1>
        <p>React, Redux and React Router</p>
        <Link to="about" className="btn btn-primary btn-lg">
            Learn more
        </Link>
    </div>
);

export default HomePage;