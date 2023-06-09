import React , {useState} from 'react';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    slot : {
        backgroundColor : "#fff" ,
        borderRadius : 25 ,
        width : "2.5rem" ,
        height : "2.5rem" ,
        minWidth : 0 ,
        border : `0.15rem solid ${theme.palette.secondary.main}` ,
        [theme.breakpoints.down("xs")] : {
            width : ({ checkout }) => checkout ? "2rem" : "2.5rem" ,
            height : ({ checkout }) => checkout ? "2rem" : "2.5rem"
        },
        "&:hover" : {
            backgroundColor : "#fff"
        }
    },
    slotText : {
        color : theme.palette.secondary.main,
        marginLeft : "-0.25rem" ,
        [theme.breakpoints.down("xs")] : {
            fontSize : ({ checkout }) => checkout ? "1.5rem" : undefined
        }
    },
    slotWrapper : {
        marginLeft : "1rem" ,
        marginBottom : "1rem" ,
      "& > :not(:first-child)" : {
          marginLeft : "-0.5rem"
      }
    },
    selected : {
        backgroundColor : theme.palette.secondary.main ,
        "&:hover" : {
            backgroundColor : theme.palette.secondary.main
        }
    },
    seletedText : {
        color : "#fff"
    },
    shipping : {
        color : "#fff",
        fontWeight : 600 ,
        marginLeft : "0.5rem" ,
         [theme.breakpoints.down("xs")] : {
            fontSize : "1rem" ,
            marginTop : "0.4rem"
         }
    }
}))

export default function Slots ({ slot , setSlot , checkout , noLabel}) {
    const classes = useStyles({ checkout }); //Here we are passing checkout into the styles object

    return (
       <Grid item container xs >
         <Grid item classes={{root : classes.slotWrapper}}>
            {[1 , 2 , 3].map(number => (
                <Button onClick={() => setSlot(number - 1)} key={number} classes={{root : clsx(classes.slot , {
                    [classes.selected] : slot === number - 1
                })}}>
                <Typography variant="h5" classes={{root : clsx(classes.slotText , {
                    [classes.seletedText] : slot === number - 1
                })}}>
                    {number}
                </Typography>
                </Button>
            ))}
        </Grid>
        
        {checkout && (
            <Grid item>
                <Typography variant="body1" classes={{root : classes.shipping}} >
                    Shipment
                </Typography>
            </Grid>
        )}

       </Grid>
    )
}


