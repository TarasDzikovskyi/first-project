import * as React from 'react';
import {useDispatch} from "react-redux";
import '../index.css'
import moment from 'moment';
import { deletePub, updatePub} from '../actions/pubs';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'

import {
    FacebookIcon,
    FacebookShareButton,
    TelegramShareButton,
    EmailShareButton,
    EmailIcon,
    TelegramIcon,
    LinkedinShareButton,
    LinkedinIcon,
    WhatsappIcon,
    WhatsappShareButton
} from 'react-share'
import {useHistory} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import 'animate.css'
import {Rating} from "@material-ui/lab";

const ExpandMore = styled((props) => {

    const {expand, ...other} = props;
    return <IconButton {...other} />;
})
(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Pub({pub, setCurrentId}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [expanded, setExpanded] = useState(false);
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const userDB = JSON.parse(localStorage.getItem('profile'))

    const userData = user || userDB


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const splitedTags = pub.tags.map((t) => t.split(','))
    const hashedTags = splitedTags.map(tag => tag.map(t => `#${t} `))

    const sharedUrl = 'http://google.com'

    const openPub = () => {
        // dispatch(getPub(pub._id, history))

        history.push(`/pubs/${pub._id}`)
    }

    const shareVisible = () => {
        const input = document.getElementById(pub.name);
        if (input.style.display === "none") {
            input.style.display = "block"
        } else {
            input.style.display = "none"
        }
    }

    const showVisible = () => {
        const input = document.getElementById('create-form');
        if (input.style.display === "none") {
            input.style.display = "block"
        } else {
            input.style.display = "none"
        }
    }

    const options = {
        size: "large",
        value: pub.ratings,
        readOnly: true,
        precision: 0.5,
    };


    return (
        <div id='animation-delete' style={{display: 'block'}} >
            <Card sx={{maxWidth: 345}} className='center-box hover' id='br-15'>
                <CardHeader
                    avatar={<Avatar sx={{bgcolor: red[500]}} aria-label="recipe">??</Avatar>}
                    title={pub.name}
                    subheader={moment(pub.createdAt).fromNow()}
                />
                <div onClick={openPub}>
                    <CardMedia
                        component="img"
                        height="194"
                        image={pub.avatar}
                        alt={pub.name}
                    />
                </div>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <span className='isActive'>{hashedTags}</span>
                    </Typography>
                    <br/>
                    <Typography variant="body2" color="text.secondary" className='h-72'>
                        {pub.description}
                    </Typography>
                    <br/>
                    <Typography variant="body2" color="text.secondary" className='d-flex jc'>
                        <div>????????????: {pub.schedule}</div>
                        <div>???????????????? ??????: {pub.order}</div>
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Rating {...options}/>
                    <IconButton
                        aria-label="share"
                        className='share-block btn-none' >
                        <div className="share animate__animated animate__flipInX" id={pub.name}
                             style={{display: 'none'}} >
                            <div className='share-item'>
                                <span className='mr-5 ml-10'>
                                     <FacebookShareButton url={sharedUrl}>
                                        <FacebookIcon size={30} round={true}/>
                                     </FacebookShareButton>
                               </span>
                                <span className='mr-5'>
                                     <EmailShareButton url={sharedUrl}>
                                         <EmailIcon size={30} round={true}/>
                                     </EmailShareButton>
                                </span>
                                <span className='mr-5'>
                                    <TelegramShareButton url={sharedUrl}>
                                        <TelegramIcon size={30} round={true}/>
                                    </TelegramShareButton>
                                </span>
                                <span className='mr-5'>
                                    <WhatsappShareButton url={sharedUrl}>
                                        <WhatsappIcon size={30} round={true}/>
                                    </WhatsappShareButton>
                                </span>
                                <span className='mr-5'>
                                    <LinkedinShareButton url={sharedUrl}>
                                        <LinkedinIcon size={30} round={true}/>
                                    </LinkedinShareButton>
                                </span>
                            </div>
                        </div>
                        <ShareIcon onClick={shareVisible}/>
                    </IconButton>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                    </Collapse>
                    <ExpandMore
                        expand={expanded}
                        className='btn-none'
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more">
                        <ExpandMoreIcon/>
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent className='center'>
                        <div className='d-flex jc-sa'>
                            <IconButton
                                aria-label="settings"
                                className='btn-none'
                                onClick={() => setCurrentId(pub._id)}
                                >
                                <div className='text-post' onClick={showVisible}>Edit</div>
                                <FontAwesomeIcon className='small-icon' icon={faEdit}/>
                            </IconButton>
                            <IconButton
                                aria-label="settings"
                                className='btn-none'
                                onClick={() => {
                                    dispatch(deletePub(pub._id))}}>
                                <div className='text-post'>Delete</div>
                                <FontAwesomeIcon className='small-icon' icon={faTrash}/>
                            </IconButton>
                        </div>
                        <div className='mt-22'>
                            <Typography>???????????? - ???????????????? ??????????????????????????!</Typography>
                        </div>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}
