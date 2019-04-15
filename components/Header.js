import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import api from 'api'
import { colors } from 'css'
import Link from 'components/Link'
import Container from 'components/Container'

class Header extends Component {  

    renderMenu() {
        const { menu } = this.props

        return !menu ? null : (
            <Menu>
                {menu.map(item => <Link key={item.id} to={item.url} title={item.title} />)}
            </Menu>
        )
    }

    render() {
        return (
            <Wrapper>
                <Container flex justify="space-between" align="center">
                    <Link to={'/'}>
                        <Logo>SSR App</Logo>
                    </Link>
                    {this.renderMenu()}
                </Container>
            </Wrapper>
        );
    }
}

const mapStateToProps = state => ({
    menu: state.menus.en['main-menu']
})

export default connect(mapStateToProps, null)(Header)

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
        color: ${colors.accent};
        margin-left:15px;
        &:hover {
            text-decoration: underline;
        }
    }
`