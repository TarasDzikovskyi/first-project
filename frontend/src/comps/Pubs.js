import {useSelector} from "react-redux";
import {Grid, CircularProgress, PropTypes} from '@material-ui/core'

import useStyles from '../styles'
import Pub from './Pub'

export default function Pubs() {
    const pubs = useSelector((state) => state.pubs)
    console.log(pubs)


    const classes = useStyles()

    return (
        !pubs.length ? <CircularProgress/> : (
            <div>
                <Grid className='align-center'>
                    {pubs.map((pub) => (
                        <Grid key={pub._id}  className='center-boxes mt'>
                            <Pub pub={pub}/>
                        </Grid>
                    ))}
                </Grid>
            </div>
        )
    )
}
