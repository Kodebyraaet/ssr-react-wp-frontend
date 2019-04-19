import React, { Component } from 'react';
import styled from 'styled-components';

import WP from 'WP';
import CookieIcon from 'components/icons/CookieIcon';
import { cookie } from 'helpers';

class CookieNotice extends Component {

    _onAccept() {
        cookie.set('terms_accepted', 'true', 365);
        this.forceUpdate();
    }
  
    render() {
        const defaultMessage = 'Here’s an example of a simple notification message. It lets users know that the website uses cookies to offer relevant information and for optimal performance.';

        if(cookie.get('terms_accepted')) return null;

        return (
            <Wrapper>
                <TitleWrapper>
                    <CookieIcon color="#AAAAAA"/>
                    <span dangerouslySetInnerHTML={{ __html: WP.options.cookie_popup_title || 'This website uses cookies' }}/>
                </TitleWrapper>
                <div className="message" dangerouslySetInnerHTML={{ __html: WP.options.cookie_popup_description || defaultMessage }} />
                <Button onClick={this._onAccept.bind(this)}>Accept & close</Button>
            </Wrapper>
        );
    }
}

export default CookieNotice;

const Wrapper = styled.div`
    position: fixed;
    bottom: 100px;
    right:0;
    max-width:350px;
    padding:30px;
    background: #F3F3F3;
    color: #AAAAAA;
    z-index: 9999;

    @media(max-width: 480px) {
        bottom:0;
        max-width: 100%;
    }

    .message {
        margin-bottom:30px;
        a {
            text-decoration: underline;
            &:hover {
                text-decoration: none;
            }
        }
    }
`

const TitleWrapper = styled.div`
    display: flex;
    align-items:center;
    margin-bottom:20px;
    svg {
        margin-right: 20px;
        width: 90px;
        height: 70px;
    }
    span {
        font-weight: 700;
        font-size:28px;
        line-height: 1.3;
        margin:0;
    }
`

const Button = styled.button`
    width:100%;
    border: 2px solid #AAAAAA;
    color: #AAAAAA;
    padding:10px 30px;
    cursor:pointer;
`