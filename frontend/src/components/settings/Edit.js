import React , {useState , useContext} from 'react';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import BackwardsIcon from '../../images/BackwardsOutline'
import editIcon from '../../images/edit.svg'
import saveIcon from '../../images/save.svg'
import axios from 'axios'
import { CircularProgress } from '@material-ui/core';
import { FeedBackContext } from '../../contexts';
import { setSnackbar , setUser } from '../../contexts/actions';
import Confirmation from './Confirmation';


const useStyles = makeStyles(theme => ({
    icon : {
        height : "8rem" ,
        width : "8rem"
    },
    editContainer : {
        borderLeft : "4px solid #fff" ,
        [theme.breakpoints.down("md")] : {
            height : "30rem",
            borderLeft : 0
        }
    }
}))

export default function Edit ({ setSelectedSetting , edit , setEdit , details , locations , 
    detailSlot , locationSlot , changesMade , user , dispatchUser , isError}) {
    const classes = useStyles();

    const { dispatchFeedback} = useContext(FeedBackContext)
    const [loading , setLoading ] = useState(false)
    const [dialogOpen , setDialogOpen] = useState(true)

    const handleEdit = () => {
        if (edit && isError) {
            dispatchFeedback(setSnackbar({status : "error" , message : "All Fields must be valid before saving"}))
            return
        }


        setEdit(!edit)
        const { password , ...newDetails} = details

        if (password !== "********") {
            setDialogOpen(true)
        }

        //If edit is true we have clicked save icon
        if (edit && changesMade) {           
            setLoading(true)
            axios.post(process.env.GATSBY_STRAPI_URL + "/users-permissions/set-settings" ,
             { details : newDetails , detailSlot , location : locations , locationSlot } ,
             {headers : { Authorization : `Bearer ${user.jwt}`}}
             ).then( response => {
                 setLoading(false)
                 dispatchFeedback(setSnackbar({ status : "success" , message : "Settings Saved Successfully"}))
                 dispatchUser(setUser({...response.data , jwt : user.jwt , onboarding : true}))
             }).catch(error => {
                 setLoading(false)
                 console.error(error)
                 dispatchFeedback(setSnackbar({status : "error" , message : "There was a problem saving your settings"}))
             })
        }
    }

    return (
        <Grid item container lg={6} xs={12} justify="space-evenly" justify="center" alignItems="center" classes={{root : classes.editContainer}}>
            <Grid item>
                <IconButton onClick={() => setSelectedSetting(null)}>
                    <span className={classes.icon}>
                        <BackwardsIcon color="#fff"/>  {/* If using viewbox property the change the size we should wrap this component inside div */}
                    </span>                  
                </IconButton>
            </Grid>
            <Grid item>
                {loading ? < CircularProgress color="secondary" size="8rem"/> : (
                    <IconButton disabled={loading} onClick={handleEdit}>
                        <img src={edit ? saveIcon : editIcon} alt={`${edit ? "save" : "edit"} settings`} className={classes.icon}/>
                    </IconButton>
                )}
            </Grid>

          <Confirmation dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} 
          user={user} dispatchFeedback={dispatchFeedback}
          setSnackbar={setSnackbar}/>

        </Grid>
    )
}