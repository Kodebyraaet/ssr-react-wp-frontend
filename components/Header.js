import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'

import api from 'api'
import { colors } from 'css'
import Link from 'components/Link'
import Container from 'components/Container'

class Header extends Component { 

    renderMenu() {
        const { menu } = this.props

        if(!menu) return null;
        
        return !menu.items ? null : (
            <Menu>
                {menu.items.map(item => <Link prefetch key={item.id} to={item.url} title={item.title} />)}
            </Menu>
        )
    }

    homeLink() {
        const { router, wp } = this.props
        const lang = router.query.lang
        const defaultLang = wp ? wp.default_language : ''

        if(!lang) return '/'

        return  lang === defaultLang ? '/' : '/'+lang
    }

    renderLangSwitcher() {
        const { router, wp } = this.props
        if(wp && wp.languages) {
            return(
                <LanguageSwitcher>
                    {wp.languages.map(lang => {
                        return(
                            <Link key={lang} to={'/'+lang}>
                                {lang.toUpperCase()}
                            </Link>
                        )
                    })}
                </LanguageSwitcher>
            )
        }
        return null;
    }

    render() {
        return (
            <Wrapper>
                <Container flex justify="space-between" align="center">
                    <Link to={this.homeLink()}>
                        <Logo>SSR App</Logo>
                    </Link>
                    {this.renderLangSwitcher()}
                    {this.renderMenu()}
                </Container>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state, props) => {
    const lang = props.router.query.lang || state.wp.default_language
    const menu = lang && state.menus[lang] ? state.menus[lang]['primary-menu'] : state.menus['primary-menu']
    //console.log('state menus:',state.menus, 'lang:',lang);
    return {
        menu: menu || null,
        wp: state.wp,
    }
}

export default withRouter(connect(mapStateToProps, null)(Header))

const Wrapper = styled.div`
    padding: 20px 0;
    background: ${colors.lightBlue};
    margin-bottom:20px;
`

const Logo = styled.h1`
    color: #000;
`

const Menu = styled.nav`
    a {
        margin-left:15px;
        &:hover {
            text-decoration: underline;
        }
    }
`

const LanguageSwitcher = styled.div`
    a {
        margin: 0 5px;
    }
`