import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {Rating} from "@material-ui/lab";
import {useHistory} from "react-router";

export default function PubOnMap({setCurrentId, pub}) {

    const history = useHistory()

    const openPub = () => {
        history.push(`/pubs/${pub._id}`)
    }

    const options = {
        size: "large",
        value: pub.ratings,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <div className='mb-40 '>

        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={pub.avatar}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {pub.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                    <Typography>
                        <Rating {...options}/>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" className='btn-none' onClick={openPub}>
                    Більше
                </Button>
            </CardActions>
        </Card>
        </div>

    );
}
