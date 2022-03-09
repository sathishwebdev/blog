import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}categories`);
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar" style={{paddingBottom:"60px"}}>
      <div className="sidebarItem">
        <span className="sidebarTitle" id="about">ABOUT ME</span>
        
        <p style={{maxWidth:"600px"}}>
         Hey 👋🏻, <br/>
         I'm <a href="https://sathishwebdev.netlify.app"  target="_blank" rel="noreferrer">Sathish Kumar S</a> , This is a blog site where you can share your stories. In future Updation, There will be a Api for your posts so you can create your posts here and take it to where ever you want.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
            <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle" id="contact" >FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
      </div>
    </div>
  );
}
