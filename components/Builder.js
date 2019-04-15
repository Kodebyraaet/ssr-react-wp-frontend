import React, { Component } from 'react';

import modules from './modules';
import TopSpacer from 'partials/TopSpacer';
import ErrorBoundary from 'partials/ErrorBoundary';

class Builder extends Component {

    _maybeRenderTopSpacer() {
        return <TopSpacer />
    }

    render() {
        const { data, page } = this.props;

        return (
            <div>
                
                {this._maybeRenderTopSpacer.bind(this)()}
                
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
            </div>
        );
    }
}

export default Builder;
