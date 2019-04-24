import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Container from '../Container'
import api from '../../api'
import Image from 'components/Image'

class BlogPosts extends Component {
    
    constructor(props) {
        super(props)
        
        this.state = {
            posts: null,
        }
    }

    async componentDidMount() {
        const { lang } = this.props
        const posts = await api.get('post', { lang, limit: 100 })
        this.setState({ posts })
    }
  
    render() {
        const { posts } = this.state

        console.log(posts);

        return (
            <Wrapper>
                <Container>
                    <PostGrid>
                        {posts && posts.map(post => {
                            return(
                                <PostItem key={post.id}>
                                    <Image image={post.featured_image} background />
                                    <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                </PostItem>
                            )
                        })}
                    </PostGrid>
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

const PostGrid = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const PostItem = styled.li`
    width: 32%;
    margin-bottom: 2%;
    position: relative;
    h1 {
        font-weight: 700;
        font-size:18px;
        margin-top:20px;
    }
`