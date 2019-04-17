import React, { Component } from 'react';
import styled from 'styled-components';

import ErrorIcon from 'images/ErrorIcon';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        console.log(error, info);
    }
  
    render() {
        if (this.state.hasError) {
            return(
                <Error>
                    <ErrorIcon/>
                    {this.props.for + ' component crashed because of an error'}
                </Error>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

const Error = styled.div`
    margin: 20px 0;
    .container {
        font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
        font-weight: normal;
        color: #FF5255;
        justify-content: center;
        display:flex;
        align-items: center;
        svg {
            margin-right:15px;
        }
    }
`