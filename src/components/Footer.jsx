import React from 'react';
import { Link } from "react-router-dom";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";

function Footer() {
    return (
        <footer>
            <div className='footerNav'>
                <div className='icons'>
                    <a target="_blank" href="https://www.facebook.com/">
                        <FaFacebook size="4vmin" color= "rgb(37, 101, 190)" title="Facebook" /></a>
                    
                        <a target="_blank" href="https://www.youtube.com">
                        <BsYoutube size="4vmin" color= "red" title="YouTube" /></a>

                           <a target="_blank" href="https://www.twitter.com">
                        <AiFillTwitterCircle size="4vmin" color= "RGB( 29, 161, 242)" title="Twitter" /></a>
                </div>

                <ul>
                    <li>
                        <Link to={"/TermsOfUse"}>
                            Terms of Use
                        </Link>

                    </li>

                    <li>
                        <a target="_blank" href="https://privacy.ehi.com/en-us/home.html">
                            Privacy Policy
                        </a>
                    </li>

                    <li>
                        <a target="_blank" href="https://privacy.ehi.com/en-us/home/cookie-policy.html">
                            Cookie Policy
                        </a>
                    </li>

                    <li>
                        <a href="#one_trust" onClick={() => preventDefault()}>
                            Cookie Settings / AdChoices
                        </a>
                    </li>

                    <li>
                        <span>
                            © 2023  I&G Rental Car, Inc. All Rights Reserved.
                        </span>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;
