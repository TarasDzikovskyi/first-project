import * as React from 'react';
import {useDispatch, useSelector} from "react-redux";

import '../index.css'
import moment from 'moment';
import {likePub, deletePub, updatePub} from '../actions/pubs';
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
import FavoriteIcon from '@mui/icons-material/Favorite';
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
import {Link, useHistory} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";

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

export default function Pub({pub}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [expanded, setExpanded] = React.useState(false);
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    const userDB = JSON.parse(localStorage.getItem('profile'))
    const [userData, setUserData] = useState([])
    const [newName, setNewName] = useState('')

    useEffect(() => {
        setUserData(userDB)
        setUserData(user)
    }, [])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const splitedTags = pub.tags.map((t) => t.split(','))
    const hashedTags = splitedTags.map(tag => tag.map(t => `#${t} `))


    // name: '', address: '', contact: '', tags: '', statistic: '', schedule: '', selectedFile: ''
    const sharedUrl = 'http://google.com'

    const openPub = () => {
        // dispatch(getPub(pub._id, history))

        history.push(`/pubs/${pub._id}`)
    }

    const updateHandleForm = async () => {
        await dispatch(updatePub(pub._id, {name: newName}))
    }

    return (
        <div>
            <Card sx={{maxWidth: 345}} className='center-box hover' id='br-15'>
                <CardHeader
                    avatar={<Avatar sx={{bgcolor: red[500]}} aria-label="recipe">П</Avatar>}

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
                    <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" disabled={!userData}
                                onClick={() => dispatch(likePub(pub._id))}>
                        <FavoriteIcon/>
                        {pub.likeCount}
                    </IconButton>
                    <IconButton aria-label="share" className='share-block'>
                        <div className="share">
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
                        <ShareIcon/>
                    </IconButton>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                    </Collapse>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon/>
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <IconButton aria-label="settings" onClick={() => dispatch(deletePub(pub._id))}>
                            <FontAwesomeIcon className='small-icon' icon={faTrash}/>
                        </IconButton>
                        <IconButton aria-label="settings">
                            <FontAwesomeIcon className='small-icon' icon={faEdit}/>
                        </IconButton>
                        <div className='center-box'>

                            <input
                                type='text'
                                placeholder='name...'
                                onChange={({target: {value}}) => setNewName(value)}
                            />
                            <button onClick={updateHandleForm}>Update</button>
                        </div>
                        <Typography>
                            Пиячок - споживай відповідально!
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}
