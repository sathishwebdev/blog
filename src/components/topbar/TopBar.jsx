import { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import {Button, IconButton} from '@mui/material'
import * as Icons from '@mui/icons-material'
import "./topbar.css";

export function TopBar() {
  const { user, dispatch } = useContext(Context);
  

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
            <img className="topImg" src={user.profilePic} alt="" />
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
    className='collopse-nav' id="c-nav" style={{color:"whitesmoke"}}
    >
      
            <Link className="link" to="/" onClick={CloseMenu}>
              HOME
            </Link>
         
            <Link className="link" to="/settings" onClick={CloseMenu}>
              PROFILE
            </Link>
          
            <Link className="link" to="/#about" onClick={CloseMenu}>
              ABOUT
            </Link>
            <Link className="link" to="/#contact" onClick={CloseMenu}>
              CONTACT
            </Link>
            <Link className="link" to="/write" onClick={CloseMenu}>
              WRITE
            </Link>
          
          {user ? <Button color="inherit" variant="contained" sx={{padding:"2%", margin:"1%", color:"black"}} onClick={handleLogout && CloseMenu}>
            LOGOUT
          </Button>
          : <>
            
            <Link className="link" to="/login" onClick={CloseMenu}>
              LOGIN
            </Link>
                   
            <Link className="link" to="/register" onClick={CloseMenu}>
              REGISTER
            </Link>
                   
          </> 
        }
    </div>
  </>

}