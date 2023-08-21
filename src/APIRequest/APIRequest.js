import axios from "axios";
import { ErrorToast, SuccessToast } from "../helpers/FormHelper";
import { getToken, setEmail, setOTP, setToken, setUserDetails } from "../helpers/SessionHelper";
import {
    SetCancelledGoal,
    SetCompletedGoal,
    SetNewGoal,
    SetProgressGoal
} from "../redux/state-slice/GoalSlice";
import { SetProfile } from "../redux/state-slice/ProfileSlice";
import { HideLoader, ShowLoader } from "../redux/state-slice/SettingsSlice";
import { SetSummary } from "../redux/state-slice/SummarySlice";
import store from "../redux/store/store";

const BaseURL = "https://focusmate-server.vercel.app/api/v1";

const AxiosHeader = {headers: {"token": getToken()}};

export function RegistrationRequest(email,firstName,lastName,mobile,password,photo){
    store.dispatch(ShowLoader());
    let URL=BaseURL+"/registration";
    let PostBody={email:email,firstName:firstName,lastName:lastName,mobile:mobile,password:password, photo:photo}
    return axios.post(URL,PostBody).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            if(res.data['status']==="fail"){
                if(res.data['data']['keyPattern']['email']===1){
                    ErrorToast("Email Already Exist")
                    return false;
                }
                else{
                    ErrorToast("Something Went Wrong")
                    return false;
                }
            }
            else {
                SuccessToast("Registration Success")
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return  false;
        }
    }).catch((err)=>{
        store.dispatch(HideLoader())
        ErrorToast("Something Went Wrong")
        return false;
    })
}


export function LoginRequest(email, password) {
    store.dispatch(ShowLoader());
    let URL=BaseURL+"/login";
    let PostBody={"email":email,"password":password};

    return axios.post(URL,PostBody).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            setToken(res.data['token']);
            setUserDetails(res.data['data']);
            SuccessToast("Login Success")
            return true;
        }
        else{
            ErrorToast("Invalid Email or Password")
            return  false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });


}


export function GetProfileDetails(){
    store.dispatch(ShowLoader())
    let URL=BaseURL+"/profileDetails";
    axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            store.dispatch(SetProfile(res.data['data'][0]))
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    });
}



export function ProfileUpdateRequest(email,firstName,lastName,mobile,password,photo){

    store.dispatch(ShowLoader())

    let URL=BaseURL+"/updateProfile";

    let PostBody={email:email,firstName:firstName,lastName:lastName,mobile:mobile,password:password,photo:photo}
    let UserDetails={email:email,firstName:firstName,lastName:lastName,mobile:mobile,photo:photo}

    return axios.post(URL,PostBody,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){

            SuccessToast("Profile Update Success")
            setUserDetails(UserDetails)

            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return  false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}



// Recover Password - step -> 01 _ send OTP
export function RecoverVerifyEmailRequest(email){
    store.dispatch(ShowLoader())
    let URL=BaseURL+"/RecoverVerifyEmail/"+email;
    return axios.get(URL).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){

            if(res.data['status']==="fail"){
                ErrorToast("No user found");
                return false;
            }
            else{
                setEmail(email)
                SuccessToast("A 6 Digit verification code has been sent to your email address. ");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}



// Recover Password - step -> 02 _ Verify OTP
export function RecoverVerifyOTPRequest(email,OTP){
    store.dispatch(ShowLoader())
    let URL=BaseURL+"/RecoverVerifyOTP/"+email+"/"+OTP;
    return axios.get(URL).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            if(res.data['status']==="fail"){
                ErrorToast(res.data['data']);
                return false;
            }
            else{
                setOTP(OTP)
                SuccessToast("Code Verification Success");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}



// Recover Password - step -> 03 _ Reset Pass
export function RecoverResetPassRequest(email,OTP,password){
    store.dispatch(ShowLoader())
    let URL=BaseURL+"/RecoverResetPass";
    let PostBody={email:email,OTP:OTP,password:password}

    return axios.post(URL,PostBody).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){

            if(res.data['status']==="fail"){
                ErrorToast(res.data['data']);
                return false;
            }
            else{
                setOTP(OTP)
                SuccessToast("NEW PASSWORD CREATED");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}


// goal api requests
export function NewGoalRequest(title, description) {
    store.dispatch(ShowLoader());

    let URL = BaseURL+"/createGoal";
    let PostBody={"title":title, "description":description, status:"New"};

    return axios.post(URL,PostBody,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            SuccessToast("New Goal Created")
            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }

    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    })
}


export function GoalListByStatus(Status){
    store.dispatch(ShowLoader());
    let URL=BaseURL+"/listGoalByStatus/"+Status;

    axios.get(URL,AxiosHeader).then((res)=> {
        store.dispatch(HideLoader())
        if(res.status===200){
            if(Status==="New"){
                store.dispatch((SetNewGoal(res.data['data'])))
            }
            else if(Status==="Completed"){
                store.dispatch(SetCompletedGoal(res.data['data']))
            }
            else if(Status==="Cancelled"){
                store.dispatch(SetCancelledGoal(res.data['data']))
            }
            else if(Status==="Progress"){              store.dispatch(SetProgressGoal(res.data['data']))
            }
        }
        else{
                ErrorToast("Something Went Wrong")
            }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    });
}



export function SummaryRequest(){
    store.dispatch(ShowLoader())
    let URL=BaseURL+"/goalStatusCount";
    axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            store.dispatch(SetSummary(res.data['data']))
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    });
}


export function DeleteRequest(id){
    store.dispatch(ShowLoader())
    let URL=BaseURL+"/deleteGoal/"+id;
    return axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            SuccessToast("Delete Successful")
            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}


export function UpdateStatusRequest(id,status){
    store.dispatch(ShowLoader())
    let URL=BaseURL+"/updateGoalStatus/"+id+"/"+status;
    return axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            SuccessToast("Status Updated")
            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}