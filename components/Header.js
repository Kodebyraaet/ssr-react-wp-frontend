import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'

import colors from '../css/colors'
import Link from './Link'
import Container from './Container'

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
        const { lang, wp } = this.props
        return lang === wp.default_language ? '/' : '/'+lang
    }

    renderLangSwitcher() {
        const { wp } = this.props
        if(wp && wp.languages) {
            return(
                <LanguageSwitcher>
                    {wp.languages.map(lang => {
                        return(
                            <Link key={lang} to={lang === wp.default_language ? '/' : '/'+lang}>
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
        const { wp } = this.props

        if(!wp) return null

        return (
            <Wrapper>
                <Container flex justify="space-between" align="center">
                    <Link to={this.homeLink()}>
                        <Logo>{wp.site_name}</Logo>
                    </Link>
                    {this.renderLangSwitcher()}
                    {this.renderMenu()}
                </Container>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state, props) => {
    const menu = state.lang && state.menus[state.lang] ? state.menus[state.lang]['primary-menu'] : state.menus['primary-menu']
    return {
        menu: menu || null,
        wp: state.wp,
        lang: state.lang,
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
        &.active {
            text-decoration: underline;
        }
    }
`

const LanguageSwitcher = styled.div`
    a {
        margin: 0 5px;
    }
`