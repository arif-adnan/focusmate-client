import React, { Fragment, useRef } from "react";
import { Container, Navbar } from "react-bootstrap";
import { AiOutlineDashboard, AiOutlineFileDone, AiOutlineLogout } from "react-icons/ai";
import { GiCancel, GiProgression } from "react-icons/gi";
import { MdMenuOpen } from "react-icons/md";
import { TfiLayoutListThumbAlt, TfiUser, TfiWrite } from "react-icons/tfi";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/focusmate-logo1.jpg";
import { getUserDetails, removeSessions } from "../../helpers/SessionHelper";


const MasterLayout = (props) => {

    let contentRef,sideNavRef=useRef();

    const onLogout=()=>{
        removeSessions();
    }

    const MenuBarClickHandler = () => {
        let sideNav = sideNavRef;
        let content = contentRef;
        if (sideNav.classList.contains("side-nav-open")) {
            sideNav.classList.add("side-nav-close");
            sideNav.classList.remove("side-nav-open");
            content.classList.add("content-expand");
            content.classList.remove("content");
        } else {
            sideNav.classList.remove("side-nav-close");
            sideNav.classList.add("side-nav-open");
            content.classList.remove("content-expand");
            content.classList.add("content");
        }
    };



    return (
        <Fragment>
            <Navbar  className="fixed-top px-0 shadow-sm ">
                <Container fluid={true}>
                    <Navbar.Brand >
                    <a className="icon-nav m-0 h4" onClick={MenuBarClickHandler}><MdMenuOpen/></a>
                        <a href=""><img className="nav-logo mx-2 logo-style"  src={logo} alt="logo"/></a>
                    </Navbar.Brand>

                    <div className="float-right h-auto d-flex">
                        <div className="user-dropdown">
                            <img className="icon-nav-img icon-nav" src={getUserDetails()['photo']} alt=""/>
                            <div className="user-dropdown-content ">
                                <div className="mt-4 text-center">
                                <img className="icon-nav-img" src={getUserDetails()['photo']} alt=""/>
                                    <h6>{getUserDetails()['firstName']}</h6>
                                    <hr className="user-dropdown-divider  p-0"/>
                                </div>
                                <NavLink to="/Profile" className="side-bar-item">
                                    <TfiUser className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Profile</span>
                                </NavLink>
                                <a onClick={onLogout} className="side-bar-item">
                                    <AiOutlineLogout className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Logout</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </Navbar>

            <div ref={(div) =>{sideNavRef=div}} className="side-nav-open">

                <NavLink   className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" }  to="/"  end>
                    <AiOutlineDashboard className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Dashboard</span>
                </NavLink>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } to="/Create" >
                    <TfiWrite className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Set New Goal</span>
                </NavLink>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } to="/All" >
                    <TfiLayoutListThumbAlt className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">New Goal</span>
                </NavLink>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } to="/Progress" >
                    <GiProgression className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">In Progress</span>
                </NavLink>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" }  to="/Completed" >
                    <AiOutlineFileDone className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Completed</span>
                </NavLink>

                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" }  to="/Cancelled" >
                    <GiCancel className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Cancelled</span>
                </NavLink>

            </div>

            <div ref={(div) => contentRef = div} className="content">
                {props.children}
            </div>

        </Fragment>
    );
};

export default MasterLayout;