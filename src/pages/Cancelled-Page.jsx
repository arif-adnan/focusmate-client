import React, { Fragment, Suspense, lazy } from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader";
import MasterLayout from "../components/MasterLayout/MasterLayout";
const Cancelled =lazy(() => import('../components/Cancelled/Cancelled'));

const CancelledPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Cancelled/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CancelledPage;