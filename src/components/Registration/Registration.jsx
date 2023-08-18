import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { RegistrationRequest } from "../../APIRequest/APIRequest";
import { ErrorToast, IsEmail, IsEmpty, IsMobile } from '../../helpers/FormHelper';

const Registration = () => {
    const navigate = useNavigate();

    let emailRef, firstNameRef, lastNameRef, mobileRef, passwordRef = useRef();

    const onRegistration = () => {
        let email=emailRef.value;
        let firstName=firstNameRef.value;
        let lastName=lastNameRef.value;
        let mobile=mobileRef.value;
        let password= passwordRef.value;
        let photo = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACwsLCwvLDI3NzJFS0JLRWZeVlZeZptvd293b5vrk6yTk6yT69D8zb/N/ND/////////////////////////////2wBDASwsLCwvLDI3NzJFS0JLRWZeVlZeZptvd293b5vrk6yTk6yT69D8zb/N/ND/////////////////////////////wAARCADIAMgDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAMEBQIB/8QAJxAAAgICAgIABgMBAAAAAAAAAAECAwQRITESQRMiM0JRUhQyYXH/xAAYAQADAQEAAAAAAAAAAAAAAAAAAgMBBP/EACURAAMAAQQBBAMBAQAAAAAAAAABAgMREiExURMiMkEjUnFhM//aAAwDAQACEQMRAD8A1wAAAAAAAAAAVrcmEOO2ULL7LO2MpbKTjqjSnfVDuRWlm/rAoxjKT1FNlmOJa+9IbbK7KbMc9s8eXcyN33P72W1hR9zZKsSkNZDfiXSM/wCNb+7CvuX3s0P4tH6B4lIbp8B6mP8AUprLuRNHN/aB08KPqbIJYlq60w9jD8NF6F9U+pExhSjKL1JNEtd9lfTMceDHh/VmwCtVkwnw+GWRGtCLTXaAAAwAAAAAAAAAAAEdlka47YAdSnGCbk9IzLsmU+I8Iittla9skpx5WcviJRSlyzomJha0QwhKb1FbL1eGlzMtwhGC1FHZjsSsrfXCOYxjFaSSOgBCQAAAAAAAAABy4xktNJlSzDT5gXQam0NNVPTMOcJQepLRPTkyhxLmJpThGa1JGZfjyr5XMR01XDLq5vijUjKM1uL2joxarZVPaNauyNkdxFqdCVw5/hIABSYAAAAAAHM5KEXJ9Ix7bXbLbJcm7zl4rpDHp+JLb/qikrRas6IlRO6jrHx/P559GmAI3qRqnTAAMFAPG0ltlG3M9VmpNjTLrovNpLbZC8mlfeZMpym9ybZ1GuyXUGPsX2yywpfKjR/l0nayaX95nfxrv0OJV2R7gw2z5D08b6o2k01tM9MKM5Qe4tovVZnqwxwxKxNdcl8Hiaa2j0QkAAAGZkY/h88OiCq2VUto2jKyKfhy2v6spL14Z0RapbaNOElOKkumdGVi3eEvF9M1RKWjJXO1gAGCArZNvhDS7ZZMe+z4ljY0rVlMc7qI4Qc5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";

        if(IsEmail(email)){
            ErrorToast("Valid Email Address Required !")
        }
        else if(IsEmpty(firstName)){
            ErrorToast("First Name Required !")
        }
        else if(IsEmpty(lastName)){
            ErrorToast("Last Name Required !")
        }
        else if(!IsMobile(mobile)){
            ErrorToast("Valid Mobile  Required !")
        }
        else if(IsEmpty(password)){
            ErrorToast("Password Required !")
        }
        else{
                RegistrationRequest(email,firstName,lastName,mobile,password,photo).then((result)=>{
                    if(result===true){
                        navigate("/login")
                    }
                })
            }

    }

    return (
        <div className="container">
            <div className="row  justify-content-center">
                <div className="col-md-10 col-lg-10 center-screen">
                    <div className="card animated fadeIn w-100 p-3">
                        <div className="card-body">
                            <h4>Sign Up</h4>
                            <hr/>
                            <div className="container-fluid m-0 p-0">
                                <div className="row m-0 p-0">
                                    <div className="col-md-4 p-2">
                                        <label>Email Address</label>
                                        <input ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                    </div>
                                    <div className="col-md-4 p-2">
                                        <label>First Name</label>
                                        <input ref={(input)=>firstNameRef=input} placeholder="First Name" className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-md-4 p-2">
                                        <label>Last Name</label>
                                        <input ref={(input)=>lastNameRef=input} placeholder="Last Name" className="form-control animated fadeInUp" type="text"/>
                                    </div>
                                    <div className="col-md-4 p-2">
                                        <label>Mobile Number</label>
                                        <input ref={(input)=>mobileRef=input} placeholder="Mobile" className="form-control animated fadeInUp" type="mobile"/>
                                    </div>
                                    <div className="col-md-4 p-2">
                                        <label>Password</label>
                                        <input ref={(input)=>passwordRef=input} placeholder="User Password" className="form-control animated fadeInUp" type="password"/>
                                    </div>

                                </div>
                                <div className="row mt-2 p-0">
                                    <div className="col-md-4 p-2">
                                        <button onClick={onRegistration} className="btn mt-3 w-100 float-end btn-primary animated fadeInUp">Complete</button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;