import React from 'react'
import Router from './Router';
import withAuthentication from '../Session/withAuthentication';

const RootContainer = ({ history }) => {
    
    return (
        <Router />
    )
}

export default withAuthentication(RootContainer);