import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {faFacebook, faGithub, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";
import './footer.css'
import {Link} from "react-router-dom";
import {faGlassCheers} from "@fortawesome/free-solid-svg-icons";
import PhoneIcon from '@mui/icons-material/Phone';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {

    return (
        // <div className='footer-wrapper'>
        //     <div className='footer d-flex w-90 center mb--50'>
        //         <div className='w-30'>
        //             <p>Download our app</p>
        //             {/*<h5>Download app for Android and IOS mobile phone</h5>*/}
        //         </div>
        //         <div className='w-30'>
        //             <h3>Alcoman</h3>
        //         </div>
        //         <div className='w-30'>
        //             <p>Follow Us</p>
        //             <div>
        //
        //                 <a href="https://github.com/TarasDzikovskyi" target="_blank">
        //                     <FontAwesomeIcon className='heart-icon' icon={faGithub}/>
        //                 </a>
        //
        //                 <a href="https://www.instagram.com/taras_dzikovskyi/" target="_blank">
        //                     <FontAwesomeIcon className='heart-icon' icon={faInstagram}/>
        //                 </a>
        //
        //                 <a href="https://www.facebook.com/profile.php?id=100007595025770" target="_blank">
        //                     <FontAwesomeIcon className='heart-icon' icon={faFacebook}/>
        //                 </a>
        // //
        // {/*            </div>*/}
        // {/*        </div>*/}
        // {/*    </div>*/}
        // {/*</div>*/}
        //

        <div className='w-90 center-box mt-105 footer'>
            <footer className="footer-distributed">

                <div className="footer-left">

                    <h3>Пиячок<FontAwesomeIcon icon={faGlassCheers}/><span>logo</span></h3>

                    <p className="footer-links">
                        <Link to="#" className="link-1">Home</Link>

                        <Link to="#">Blog</Link>

                        <Link to="#">Pricing</Link>

                        <Link to="#">About</Link>

                        <Link to="#">Faq</Link>

                        <Link to="#">Contact</Link>
                    </p>

                    <p className="footer-company-name">Company Name © 2021</p>
                </div>

                <div className="footer-center">

                    <div>
                        <i>

                        <AddLocationIcon/>                      </i>

                        <p><span>444 S. Cedros Ave</span> Solana Beach, California</p>
                    </div>

                    <div>
                        <i>

                        <PhoneIcon/>                      </i>

                        <p>+1.555.555.5555</p>
                    </div>

                    <div>
                        <i>

                        <EmailIcon/>                    </i>

                        <p><Link to="mailto:support@company.com">support@company.com</Link></p>
                    </div>

                </div>

                <div className="footer-right">

                    <p className="footer-company-about">
                        <span>About the company</span>
                        Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu
                        auctor lacus vehicula sit amet.
                    </p>

                    <div className="footer-icons">

                        <Link to="#" target='_blank'><FontAwesomeIcon icon={faFacebook}/></Link>
                        <Link to="#" target='_blank'><FontAwesomeIcon icon={faInstagram}/></Link>
                        <Link to="#" target='_blank'><FontAwesomeIcon icon={faGithub}/></Link>
                        <Link to="#" target='_blank'><FontAwesomeIcon icon={faTwitter}/></Link>

                    </div>

                </div>

            </footer>
        </div>
    )
}
