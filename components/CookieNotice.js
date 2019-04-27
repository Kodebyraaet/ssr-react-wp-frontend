import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import CookieIcon from 'components/icons/CookieIcon'
import { cookie } from 'lib/helpers'
import colors from 'css/colors'

class CookieNotice extends Component {

    _onAccept() {
        cookie.set('terms_accepted', 'true', 365);
        this.forceUpdate();
    }
  
    render() {
        if(!this.props.wp) return null
        
        const { options } = this.props.wp
        const title = (options && options.cookie_notice_title) ? options.cookie_notice_title : 'This website uses cookies'
        const message = (options && options.cookie_notice_description) ? options.cookie_notice_description : 'Here’s an example of a simple notification message. It lets users know that the website uses cookies to offer relevant information and for optimal performance.'
        
        if(cookie.get('terms_accepted')) return null;

        console.log(this.props.wp);

        return (
            <Wrapper>
                <TitleWrapper>
                    <CookieIcon color={colors.accent} />
                    <span dangerouslySetInnerHTML={{ __html: title }}/>
                </TitleWrapper>
                <div className="message" dangerouslySetInnerHTML={{ __html: message }} />
                <Button onClick={this._onAccept.bind(this)}>Accept & close</Button>
            </Wrapper>
        );
    }
}

const mapStateToProps = state => ({
    wp: state.wp
})

export default connect(mapStateToProps)(CookieNotice);

const Wrapper = styled.div`
    position: fixed;
    bottom: 0;
    right:0;
    max-width:350px;
    padding:30px;
    background: ${colors.accentLight};
    color: ${colors.accent};
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
    border: 1px solid ${colors.accent};
    color: ${colors.accent};
    font-size:16px;
    padding:10px 30px;
    background: transparent;
    cursor:pointer;
`