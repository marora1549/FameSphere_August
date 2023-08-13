import React from "react";
import famesphere_logo from './famesphere_logo.png';
import './Logo.css';

const Logo = () => {
    return(
        <div className="ma5 center">
            <img className='' style={{width: '45px', height: '45px'}} src={famesphere_logo} alt='logo'/>
            {/* <span className="mt3 f4">FameSphere</span> */}
        </div>
    )
}

export default Logo;