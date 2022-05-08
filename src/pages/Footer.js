import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab ,faInstagram, faFacebook,} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";



const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
            <div className='logo-footer'>
                <img src="image/logo.PNG" width="400" height="35" cursor="pointer" onClick={() => {window.location.href = "/home"}} />
            </div>
                <div className="item2">
                    <span style={{ paddingRight: 5 }}>Copyright </span>
                    <FontAwesomeIcon icon={faCopyright} />{" "}
                    <span style={{ paddingLeft: 5 }}>
                        {new Date().getFullYear()} Bambook-sushi. All Rights
                        Reserved.
                    </span>
                </div>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    className="item3"
                >
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                    href="http://fb.com"
                    target="_blank"
                    className="item4"
                >
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                    href="https://www.work.ua/jobs/by-company/2004042/"
                    target="_blank"
                    className="item5"
                >
                    <FontAwesomeIcon icon={fab} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;