import React , {useState} from 'react';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';
import frame from '../../images/product-frame-list.svg'
import Rating from '../home/Rating';
import Sizes from './Sizes';
import Swatches from './Swatches';
import QtyButton from './QtyButton';

import { colorIndex } from './ProductFrameGrid';
import { Link } from 'gatsby';

import { getStockDisplay } from '../product-detail/ProductInfo';

const useStyles = makeStyles(theme => ({
    frame : {
        backgroundImage : `url(${frame})`,
        backgroundPosition : "center" ,
        backgroundSize : "cover" ,
        backgroundRepeat : "no-repeat" ,
        height : "28rem"
    },
    info : {
        backgroundColor : theme.palette.primary.main,
        height : "100%" ,
        width : "100%" ,
        padding : "1rem",
        [theme.breakpoints.down("md")] : {
            height : "50%"
        },
        [theme.breakpoints.down("sm")] : {
            height : "26rem"
        }
    },
    productImage : {
        height : "20rem" ,
        width : "20rem"
    },
    stock : {
        color : "#fff"
    },
    sizesAndSwatches : {
        maxWidth : "13rem"
    },
    chipLabel : {
        fontSize : "2rem",
        "&:hover" : {
            cursor : "pointer"
        }
    }
}))

export default function ProductFrameList ({product , variant , sizes , colors ,selectedSize , selectedColor ,
     setSelectedColor , setSelectedSize , hasStyles , stock , rating}) {
    const classes = useStyles();

    const imageIndex = colorIndex(product , variant ,selectedColor);

    const images = imageIndex !== -1 
                   ? product.node.variants[imageIndex].images : variant.images

    const selectedVariant = imageIndex === -1 ? product.node.variants.indexOf(variant)  : imageIndex
    
    const stockDisplay = getStockDisplay(stock , selectedVariant)

    return (
        <Grid item container >
            <Grid item lg={9} container alignItems="center" justify="space-around" classes={{root : classes.frame}}>
                {images.map(image => (
                    <Grid item key={image.url} 
                    component={Link} to={`/${product.node.category.name.toLowerCase()}/${product.node.name.split(" ")[0].toLowerCase()}${hasStyles ? `?style=${variant.style}` : "" }`}>
                        <img src={process.env.GATSBY_STRAPI_URL + image.url} alt={image.url} className={classes.productImage}/>
                    </Grid>
                ))}
            </Grid>
            <Grid item lg={3} container direction="column" justify="space-between" classes={{root : classes.info}}>

                <Grid item container direction="column" 
                component={Link} to={`/${product.node.category.name.toLowerCase()}/
                ${product.node.name.split(" ")[0].toLowerCase()}${hasStyles ? `?style=${variant.style}` : "" }`}>
                        <Grid item>
                            <Typography variant="h4">
                                {product.node.name.split(" ")[0]}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Rating number={rating}/>
                        </Grid>
                        <Grid item>
                            <Chip label={`Rs. ${variant.price}`} classes={{label : classes.chipLabel}}/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h3" classes={{root : classes.stock}}>
                                {stockDisplay}
                            </Typography>
                        </Grid>
                </Grid>

                <Grid item container direction="column" classes={{root : classes.sizesAndSwatches}}>
                    <Sizes sizes={sizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize}/>
                    <Swatches colors={colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
                </Grid>

                <QtyButton name={product.node.name.split(" ")[0]} 
                variants={product.node.variants}
                stock={stock}
                 selectedVariant={selectedVariant}/>
            </Grid>
        </Grid>
    )
}