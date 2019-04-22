import React, { Component } from 'react';

import modules from './modules';
import ErrorBoundary from './ErrorBoundary';

class Builder extends Component {

    render() {
        const { data, page } = this.props;

        return (                            
            <div className="modules">
                {data && data.map((module, i) => {

                    if(!modules[module.acf_fc_layout]) {
                        return <p key="nomodule" style={{color: 'red'}}>Module "{module.acf_fc_layout}" does not exist</p>
                    }

                    return (
                        <div key={i} className={'module-'+module.acf_fc_layout}>
                            <ErrorBoundary for={'Module '+module.acf_fc_layout}>
                                {React.createElement(modules[module.acf_fc_layout], { data: module, page: page })}
                            </ErrorBoundary>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Builder;
