import { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import {IconButton} from '@mui/material'
import * as Icons from '@mui/icons-material'
import "./topbar.css";

export function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="nav">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/#about">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/#contact">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF+user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}

export const CollapesNav = () =>{
  
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const location = useLocation()

  const navigate = useHistory()

  const [navStatus, setNavStatus] = useState(false)

  const CloseMenu = () =>{
    document.getElementById('c-nav').style.transform = 'translateY(-100vh)'
    setNavStatus(false)
  }

  const OpenMenu = () =>{
    document.getElementById('c-nav').style.transform = 'translateY(0vh)'
    setNavStatus(true)
  }

  return <>
  <div className='nav-btn' >
    <IconButton
      onClick={!navStatus ? OpenMenu : CloseMenu}
    >
      {!navStatus ? <Icons.Menu fontSize= "large" sx={{color:location.pathname === '/' ? "unset" : "gray"}}/> :<Icons.Close sx={{color:'whitesmoke'}} fontSize='large' />}
    </IconButton>

    <div style={{
         marginLeft:"auto",
         marginRight:"10px",
       }}>
      { location.pathname === '/' ?'' : <IconButton
      
         onClick={()=>{
         navigate.goBack()
         }}
      
         >
       <Icons.ChevronLeftRounded sx={{
         color:"gray",
         fontSize:"30px"
       }} />
         </IconButton> }
    </div>
  </div>
    <div
    className='collopse-nav' id="c-nav"
    >
      <ul style={{listStyle:"none", color:"whitesmoke"}}>
          <li style={{padding:"2%", margin:"1%"}}>
            <Link className="link" to="/" onClick={CloseMenu}>
              HOME
            </Link>
          </li>
          <li style={{padding:"2%", margin:"1%"}}>
            <Link className="link" to="/#about" onClick={CloseMenu}>
              ABOUT
            </Link>
          </li>
          <li style={{padding:"2%", margin:"1%"}} onClick={CloseMenu}>
            <Link className="link" to="/#contact">
              CONTACT
            </Link>
          </li>
          <li style={{padding:"2%", margin:"1%"}} onClick={CloseMenu}>
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {user ? <li style={{padding:"2%", margin:"1%"}} onClick={handleLogout && CloseMenu}>
            "LOGOUT"
          </li>
          : <>
            <li style={{padding:"2%", margin:"1%"}} >
            <Link className="link" to="/login" onClick={CloseMenu}>
              LOGIN
            </Link>
                    </li>
                    <li style={{padding:"2%", margin:"1%"}} >
            <Link className="link" to="/register" onClick={CloseMenu}>
              REGISTER
            </Link>
                    </li>
          </> 
        }
        </ul>
    </div>
  </>

}