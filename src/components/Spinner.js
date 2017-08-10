import React from 'react';
import '../css/spinner.css';
import '../css/skeleton.css';

export default ({ visible }) => {
    if (!visible)
        return null;
    else {
        return (
            <div className="Spinner-container row">
                <div className="Spinner-icon">Retrieving...</div>
            </div>
        )
    }
}