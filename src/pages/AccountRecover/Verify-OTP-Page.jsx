import React, {lazy, Suspense} from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const VerifyOTP =lazy(() => import('../../components/AccountRecover/Verify-OTP'));

const VerifyOtpPage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoader/>}>
                <VerifyOTP/>
            </Suspense>
        </div>
    );
};

export default VerifyOtpPage;