import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Container from 'components/Container'
import api from 'api'

class BlogPosts extends Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
            posts: null,
        }
    }

    async componentDidMount() {
        const { lang } = this.props
        const posts = await api.get('post', { lang })
        this.setState({ posts })
    }
  
    render() {
        const { posts } = this.state

        return (
            <Wrapper>
                <Container>
                    {posts && posts.map(post => {
                        return(
                            <article key={post.id} style={{ marginBottom: 30 }}>
                                <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                            </article>
                        )
                    })}
                </Container>
            </Wrapper>
        );
    }
}

const mapStateToProps = state => ({
    lang: state.lang,
})

export default connect(mapStateToProps)(BlogPosts)

const Wrapper = styled.div`
    margin-bottom:80px;
    @media (max-width: 768px) {
        margin-bottom:40px;
    }
`