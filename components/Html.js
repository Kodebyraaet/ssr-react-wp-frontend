import React from 'react'
import styled from 'styled-components'

export default props => <Wrapper className={props.className} dangerouslySetInnerHTML={{ __html: props.children }} />

const Wrapper = styled.div`
    
`