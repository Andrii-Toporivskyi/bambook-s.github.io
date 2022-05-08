import React from 'react';
import products from '../data/products.json';
import Product from './Product';
import { makeStyles } from '@mui/styles';
import Header from './Header';
import Footer from './Footer';

const useStyles = makeStyles(theme => ({
    root: {

        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '0px 300px',
        backgroundImage: `url(${'https://lh3.googleusercontent.com/a1lOKOhAka2S8i4btVVYIuTcE0b2IJxxjq8TE-8pQz3edB5slzUMNOs2cyWAfX0sdlRUAVhKys-Yi-7OK32eib0bljZM2G0KqZQ6km5z8_1bVSUcX0rrk94aIWJe4coV-NYakZd_SN9dAeT99krF-ld6VWMJfn4ximuIfGkIXQ37zjK4g9wzMSV33HUPQBduWVIWC5ypISOTuliTBP5T6uBA53G_DQHM1steQo08wZE4Di6oFLYvPZqpyInypb6WmRDXH9z9WJqMwCBVcOHb215mq2sBefmWX6MiiKDQi9NTeJJLWapOYDa828zCvTh0QNuCdS2Ft3x4duSrRepSmdoFl9E331vEuYZiRqVwh-OrxQkLhUxl7KZgjmd9_MagG6GhcVjd-ubUep3cevpKqlZHnzNWLuJBgGIFV7C_itSueMECWNjpP6-O0mXb724X6S-QGGvHfGK_lmtRTKaGGfXh1Uk01DauwKk_3D3TqNdfybSYMqw_4W5fJiWb-3lbwGfCGGc6f3AmjmwYIbUlHfJYy0khoaO5dANvQqTADm2Kagho6seLx0kgvqwfkQseK6X7H74s_EDb-fIj8fTFmmrjGFVOksIZX17ISsheKDhYtyEos8ywsHchy4IxmFXmg00n23VkutgaNimiyZYeWPmUJVNe_yWdYBTJ60hq5Vn7K00Igz9BU-RiU4ei3Jwzvbmot5aTJeYtoddTycIavYzg5uCBWII7gLsox5fjotmKFaQB30ceZM380nt_hQ=w1263-h947-no?authuser=0'})`
    }
}));

export default function Products(props) {
    const { addToCart, showMessage } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {products.map(product => <Product product={product} addToCart={addToCart} showMessage={showMessage}/>)}
        </div>
    )
}