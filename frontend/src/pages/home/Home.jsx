import React, { PureComponent } from 'react';
import Banner from './Banner';
import News from './News';

class home extends PureComponent {
    render() {
        return (
            <div>
                <Banner/>
                <News/>
            </div>
        );
    }
}

home.propTypes = {

};

export default home;