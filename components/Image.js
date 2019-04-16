import React, { Component } from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';

import { isServer } from 'lib/helpers'

class Image extends Component {
    constructor(props) {
        super(props);

        this.state = {
            size: null
        }
    }

    componentDidMount() {
        const { image, debug } = this.props;

        window.addEventListener('resize', debounce(this.onResize.bind(this), 500));

        if(image && image.id) {
            this.setImageObservable();
        }

    }

    componentDidUpdate(prevProps, prevState) {
         
    }

    componentWillUnmount() {
        window.addEventListener('resize', this.onResize.bind(this));
    }

    onResize() {
        const { image, debug } = this.props;

        // reinit intersection observer
        if(this.observer && image && image.id) {
            this.observer.disconnect();
            this.setImageObservable();
        }
    }

    paddingFromRatio() {
        const { ratio } = this.props;
        const wh = ratio ? ratio.split(':') : [16, 9];
        return ( (100/Number(wh[0])) * Number(wh[1]) ).toFixed(2).toString();
    }

    setImageObservable() {
        this.io = new IntersectionObserver((entries, observer) => {
            const entry = entries[0];
            this.observer = observer;

            if(entry && entry.isIntersecting) {
                this.setState({
                    size: this.imageSizeForWidth(entry.rootBounds.width)
                }, this.loadBackgroundImage);
                observer.disconnect();
            }
        });
        
        if(this.refs.image) this.io.observe(this.refs.image.refs ? this.refs.image.refs.image : this.refs.image);
    }

    loadBackgroundImage() {
        const { size } = this.state;
        const { debug, background } = this.props;

        if(size && background) {
            var img = document.createElement("img");
            img.onload = e => {
                if(debug) console.log('lazy image loaded');
                this.refs.lazyload.setAttribute('style', `background-image: url(${size})`);
                this.refs.placeholder.className = 'placeholder hidden';
            }
            if(debug) console.log('loading lazy image');
            img.src = size;
        }
    }

    imageSizeForWidth(containerWidth) {
        const { image, debug } = this.props;

        let usedSizeName = 'full';
        const usedSize = Object.keys(image.sizes).reduce((acc, sizeName) => {
            const size = image.sizes[sizeName];
            if(size.width >= containerWidth && size.width < acc.width) {
                usedSizeName = sizeName;
                acc = size;
            }
            return acc;
        }, image.sizes.full);

        if(debug) console.log('for container width '+containerWidth+' using size:',usedSizeName, usedSize);

        return usedSize;
    }

    render() {
        const { image, backgroundPosition, className, onClick, background } = this.props;
        const { size } = this.state;

        if(!image) {
            console.warn('"image" prop is required for Image componenet');
            return null;
        }

        return (
            <Wrapper 
                ref="image" 
                background={background}
                padding={this.paddingFromRatio()}
                backgroundPosition={backgroundPosition} 
                className={className} 
                onClick={onClick} 
            >
                {background &&
                    <React.Fragment>
                        {size &&
                            <div className="lazyload" ref="lazyload" title={image.title} >
                                {/*<span>{image.alt}</span>*/}
                            </div>
                        }
                        <div className="placeholder" ref="placeholder" style={{ backgroundImage: `url(${image.sizes.min})` }} />  
                    </React.Fragment>
                }
                {!background && size &&
                    <img src={size} alt={image.alt} title={image.title} />
                }
            </Wrapper>
        );
    }
}

export default Image;

const Wrapper = styled.div`
    position:relative;
    ${props => props.background ? `
        padding-top: ${props.padding}%;
        overflow:hidden;
        width:100%;
    ` : `
    
    `}
    
    > div {
        position:absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        background-size: cover;
        background-repeat:no-repeat;
        background-position: ${props => props.backgroundPosition ? props.backgroundPosition : `center center`};
        background-color: transparent!important;
        &.placeholder {
            transition: none;
            filter: blur(10px);
            top:-5px;
            left:-5px;
            bottom:-5px;
            right:-5px;
            opacity: 1;
            transition:all .2s ease-in-out;
            &:hover {
                transform: none;
            }
            &.hidden {
                opacity:0;
            }
        }
    }

    img {
        
    }
`