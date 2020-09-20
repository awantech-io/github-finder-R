import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Navbar extends Component {
    
    // set default props
    static defaultProps = {
        title: 'Github Finder R',
        icon: 'fab fa-github'
    };
    
    // set props type
    static propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
    };

    render() {
        return (
            <nav className="navbar bg-primary"> 
                <h1>
                    <i className={this.props.icon} /> {this.props.title}
                </h1>
            </nav>
        )
    }
}

export default Navbar
