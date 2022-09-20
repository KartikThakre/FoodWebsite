import React from 'react';
import meals from '../../Assests/spencer-davis-5UeN8VrCxvs-unsplash.jpg'
import classes from './Header.module.css'
import HeaderCartButtton from './HeaderCartButton';

const Header = (props) =>{
    // here in that <div> element we use classes['main-image'] bcoz its a css class and with (-) we can't use like (.)
    return(
        <React.Fragment>
        <header className= {classes.header}>
            <h1>KhaanaKhajana</h1>
            <HeaderCartButtton onShowCart={props.onShowCart}/>
        </header>
        <div className= {classes['main-image']}>
            <img src ={meals} alt ="Table of delious Food"/>
        </div>
        </React.Fragment>
    )
}

export default Header;  