import React from 'react';
import { makeStyles } from '@mui/styles';
import { FaShoppingCart } from "react-icons/fa";
import * as FaIcons from 'react-icons/fa';

const useStyles = makeStyles(theme => ({
    header: {
        height: 80,
        display: 'flex',
        flexDirection: 'row',
        
        alignItems: 'center',
    },
    menuContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: 'auto'
    },
    menuItem: {
        padding: 20,
        color: '#ffffff',
        cursor: 'pointer',
        "&:hover": {
            color: '#cccccc',
        },
    },
    logo: {
        width: 185,
        height: 60,
        objectFit: 'contain',
    },
    navbarButton: {
        color: 'white',
        marginLeft: 8,
    }
}))

function MenuItem(props) {
    const { title } = props;
    const classes = useStyles();

    return (
        <div className={classes.menuItem} onClick={props.onClick}>
            {title}
        </div>
    )
}

const deliveryInfo = `
    Доставка тільки у м.Львів 
    по вул буде видно
`;
const newsInfo = `
    Новини які будуть роли і 
    тд 

`;
const promotionsInfo = `
    Акції новини 
    та пропозиції
`;
const aboutInfo = `
    тут буде інформація про нас 
    та наш заклад вцілому
`;


export default function Header(props) {
    const { showMessage, showSidebar, cart, cartOpen, setCartOpen } = props;

    const classes = useStyles();

    return (
        <div className={classes.header}>
            <div className='nav-menu-bar'>
                <FaIcons.FaBars onClick={() => showSidebar()} className={classes.navbarButton} />
            </div>
            <div className='logo'>
                <img className={classes.logo} src="image/logo.PNG" onClick={() => {window.location.href = "/home"}} />
            </div>

            <div className={classes.menuContainer}>
                <MenuItem onClick={() => showSidebar()} className={`navbar-button ${showSidebar && 'active'}`} title="Меню" />
                <MenuItem title="Доставка і оплата" onClick={() => showMessage("Доставка і оплата", <pre>{deliveryInfo}</pre>, null, '50%')} />
                <MenuItem title="Новини" onClick={() => {window.location.href = "/news"}}  />
                <MenuItem title="Акції"onClick={() => {window.location.href = "/promotions"}}   />
                <MenuItem title="Про нас" onClick={() => {window.location.href = "/about"}} />
                <MenuItem title="Контакти" onClick={() => {window.location.href = "/contacts"}} />
            </div>
            <div className='cart' >
                <FaShoppingCart onClick={() => setCartOpen(!cartOpen)} className={`shop-cart-button ${cartOpen && 'active'}`} />
            </div>
            <div style={{flex: '1 1 auto'}}/>
            <div style={{width: 161}}/>
        </div>
    )
}