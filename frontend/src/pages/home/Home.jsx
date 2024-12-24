import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Banner from './Banner';

class home extends PureComponent {
    render() {
        return (
            <div>
                <Banner/>
            </div>
        );
    }
}

home.propTypes = {

};

export default home;