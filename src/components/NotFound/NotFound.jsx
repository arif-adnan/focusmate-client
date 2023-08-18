import React from 'react';
import NotFoundImg from '../../assets/images/not-found-page.jpg';

const NotFound = () => {
    return (
        <div>
            <img style={{width: 700, height:500, marginTop:100,marginLeft:400}} src={NotFoundImg} alt="Not Found" />
        </div>
    );
};

export default NotFound;