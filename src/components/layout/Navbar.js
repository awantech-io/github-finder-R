import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ( {icon, title} ) => {
    
        return (
            <nav className="navbar bg-primary"> 
                <h1>
                    <i className={icon} /> {title}
                </h1>
            </nav>
        )
    
}

// set default props
Navbar.defaultProps = {
    title: 'Github Finder',
    icon: 'fab fa-github'
};

// set props type
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};

export default Navbar
