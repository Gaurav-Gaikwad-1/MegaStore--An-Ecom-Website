import React from 'react'

const Rating = ({value,text,color}) => {
    return (
        <div className='rating'>
            <span>
                <i  style={{color}}
                    className={value >=1 ? 
                                'fas fa-star' : value >= 0.5 ? 
                                'fas fa-star-half-alt':'far fa-star' }
                ></i>
            </span>
            <span>
                <i  style={{color}}
                    className={value >=2 ? 
                                'fas fa-star' : value >= 1.5 ? 
                                'fas fa-star-half-alt':'far fa-star' }
                ></i>
            </span>
            <span>
                <i  style={{color}}
                    className={value >=3 ? 
                                'fas fa-star' : value >= 2.5 ? 
                                'fas fa-star-half-alt':'far fa-star' }
                ></i>
            </span>
            <span>
                <i  style={{color}}
                    className={value >=4 ? 
                                'fas fa-star' : value >= 3.5 ? 
                                'fas fa-star-half-alt':'far fa-star' }
                ></i>
            </span>
            <span>
                <i style={{color}}
                    className={value >=5 ? 
                                'fas fa-star' : value >= 4.5 ? 
                                'fas fa-star-half-alt':'far fa-star' }
                ></i>
            </span>
            <span>{text && text}</span>
        </div>
    )
}

Rating.defaultProps={
    color:'#f8e825'
}
export default Rating

//1.Here we are taking props ie. value & text from Product.js where we have used <Rating> component.
//2.Based on value we are showing no. of stars
//3.'fas fa-star' is for full coloure star & 'fas fa-half-star-alt' is for half coloured star & 'far fa-star' is for full empty star
//4.we have show text if it contains text otherwise blank so instead of 'text ? text: '' ' we can use 'text && text'
//5.If we do ot want to pass color in Rating component which is in Product.js we can set the default value for color props to yellow 
//6.We can also define the types for each props like here we have string values its not neccesary for all components to define thatbv 