import React , {useState , useEffect} from 'react';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Chip } from '@material-ui/core';
import clsx from 'clsx';
import { IconButton } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_DETAILS } from '../../apollo/queries';
import Rating from './Rating';

import explore from '../../images/explore.svg';
import frame from '../../images/product-frame-grid.svg';

import { Link } from "gatsby";

const useStyles = makeStyles(theme => ({
    featured : {
        height : "20rem" ,
        width : "20rem",
        [theme.breakpoints.down("md")] : {
            height : '15rem' ,
            width : "15rem"
        }
    },
    frame : {
        backgroundImage : `url(${frame})`,
        backgroundPosition : "center" ,
        backgroundSize : "cover" ,
        backgroundRepeat : "no-repeat",
        borderRadius : 0,
        height : "24.8rem",
        width : "25rem",
        boxSizing : 'border-box',
        boxShadow : theme.shadows[5],
        position : "absolute",
        zIndex : 1,
        [theme.breakpoints.down("md")] : {
            height : '19.8rem' ,
            width : "20rem"
        }
    },
    slide : {
        backgroundColor : theme.palette.primary.main,
        height : "20rem" ,
        width : "24.5rem",
        zIndex : 0 ,
        transition : 'transform 0.5s ease',
        padding : "1rem 2rem",
        [theme.breakpoints.down("md")] : {
            height : '15.2rem' ,
            width : "19.5rem"
        }
    },
    slideLeft : {
        transform : "translate(-24.5rem , 0px)"
    },
    slideRight : {
        transform : "translate( 24.5rem , 0px)"
    },
    slideDown : {
        transform : "translate( 0rem , 17rem)" // 0rem is horizintal axis and 17rem is vertical axis
    },
    productContainer : {
        margin : "5rem 0"
    },
    exploreContainer : {
        marginTop : "auto"
    },
    exploreButton : {
        textTransform : "none"
    },
    exploreIcon : {
        height : '1.5rem' ,
        marginLeft : "1rem"
    },
    chipLabel : {
        ...theme.typography.h5 
    },
    chipRoot : {
        backgroundColor : theme.palette.secondary.main
    }
}))

export default function FeaturedProduct ({ node , i , matchesMD , expanded , setExpanded}) {
            const classes = useStyles();

            const [rating , setRating] = useState(0)

             const alignment = matchesMD ? "center" : i === 0 || i === 3 ? "flex-start" : 
                               i === 1 || i === 4 ? "center" : "flex-end"

            const { data } = useQuery(GET_DETAILS , { variables : {
                id : node.strapiId
            }})

            useEffect(() => {
                if (data) {
                    setRating(data.product.rating)
                }
            },[data])

            const hasStyles = node.variants.some(variant => variant.style !== null )
              
          return (
              <Grid item container justify={alignment} key={node.strapiId} classes={{root : classes.productContainer}} alignItems="center">
                
                    <IconButton disableRipple onClick={() => expanded === i ? setExpanded(null) : setExpanded(i)} classes={{root : classes.frame}}>
                        <img 
                        src={process.env.GATSBY_STRAPI_URL + node.variants[0].images[0].url } 
                        alt={node.name} 
                        className={classes.featured}/>
                    </IconButton>

                     <Grid container direction="column" classes={{root : clsx(classes.slide , {
                         [classes.slideLeft] : !matchesMD && expanded === i && alignment === "flex-end" ,
                         [classes.slideRight] : !matchesMD && expanded === i && (alignment === "flex-start" || alignment === "center"),
                         [classes.slideDown] : matchesMD && expanded === i
                     })}}>
                         <Grid item >
                            <Typography variant="h4" >
                                {node.name.split(" ")[0]}                       
                            </Typography> 
                         </Grid>
                         <Grid item >
                                <Rating number={rating} />
                         </Grid>
                         <Grid item >
                             <Chip classes={{root : classes.chipRoot , label : classes.chipLabel}} label={`Rs ${node.variants[0].price}`} />
                         </Grid>
                         <Grid item classes={{root : classes.exploreContainer}}>
                             <Button 
                                classes={{root : classes.exploreButton}} 
                                component={Link} 
                                to={`/${node.category.name.toLowerCase()}/${node.name.split(" ")[0].toLowerCase()}${hasStyles ? `?style=${node.variants[0].style}` : ""}`}>
                                 <Typography variant="h5" > Details </Typography>
                                 <img className={classes.exploreIcon} src={explore} alt="go to product details" />
                             </Button>
                         </Grid>    
                    
                    </Grid> 
                  
              </Grid>
          )
}