import React, {lazy, Suspense} from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const SendOTP =lazy(() => import('../../components/AccountRecover/Send-OTP'));


const SendOtpPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <SendOTP/>
        </Suspense>
    );
};

export default SendOtpPage;