import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        border: 'solid 1px silver',
        borderRadius: 8,
        position: 'absolute',
        top: 50,
        minWidth: '500px',
        backgroundColor: 'white',
        left: '50%',
        transform: 'translate(-50%, 0%)',
        color: 'black !important',
    },
    title: {
        height: 40,
        lineHeight: '40px',
        backgroundColor: '#dfe3ee',
        position: 'relative',
        color: 'black',
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: 36,
        width: 36,
        textAlign: 'center',
        padding: 0,
        "&:hover": {
            color: 'gray',
            cursor: 'pointer',
        }
    },
    content: {
        padding: 20,
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'left',
    },
    img: {
        height: 200,
        width: 200,
        objectFit: 'contain',
    }
}))

export default function Message(props){
    const {title, content, close, img, width} = props;
    const classes = useStyles();

    return (
        <div className={classes.root} style={{width}}>
            <div className={classes.title}>
                {title}
                <span 
                    className={classes.closeButton}
                    onClick={e => close && close()}
                >
                    X
                </span>
            </div>
            <div className={classes.content}>
                {Boolean(img) && <img className={classes.img} src={img}/>}
                {content}
            </div>
        </div>
    )
}