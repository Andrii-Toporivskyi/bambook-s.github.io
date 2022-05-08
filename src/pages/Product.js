import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button } from 'react-bootstrap';

const useStyles = makeStyles(theme => ({
    root: {
        width: 380,
        height: 465,
        border: 'solid silver 1px',
        borderRadius: 3,
        margin: 15,
        textAlign: "initial",

    },
    imgContainer: {
        height: 325,
        position: 'relative',
    },
    img: {
        width: '100%',
        height: '105%', 
        objectFit: 'cover',
    },
    title: {
        margin: 16,
        textAlign: "initial",
        color: "white",
        fontSize: 20,
        height: 52,
        paddingTop: 10,
        paddingLeft: 12,
        width: 245,

    },
    order: {
        cursor: 'pointer',
        backgroundColor: "black",
        border: 'solid #87a52b 2px',
        borderRadius: 3,
        fontSize: 24,
        paddingLeft: 7,

        fontFamily: "TTNorms Light",
        fontWeight: "bold",
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3,
        textDecoration: "none",
        color: "green",
        padding: 7,
        marginLeft: 22,
        marginRight: 50,
    },

    text: {
        color: "white",
        fontSize: 22,
        marginLeft: -84,
        
    },
    otherbg: {
        backgroundColor: "black",
        height:122,

    },
    Button:{
       background: "black",
       color: "white", 
    }
    
}));

export default function Product(props) {
    const { product, addToCart, showMessage } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.imgContainer}>
                <img className={classes.img} src={product.src}/>
            </div>
            <div>
                <div className={classes.otherbg}>
                    <div className={classes.title}>
                        {product.name}
                    </div>
                    <div>
                        <span className={classes.order} onClick={() => addToCart(product)}>В корзину  </span>
                        <span className='button-info'>
                            <Button onClick={() => showMessage(product.name, <pre>{product.description}</pre>, product.src)}>...</Button></span>
                        <span className={classes.text}> {product.price}₴</span>
                    </div>
                </div>
            </div>
        </div>
    )
}