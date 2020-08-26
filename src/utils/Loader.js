import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loader = () => {
    return(
        <div className="page-loader">
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}
