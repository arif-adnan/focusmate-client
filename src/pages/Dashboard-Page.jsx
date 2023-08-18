import React, { Fragment, lazy } from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout";
const Dashboard = lazy(() => import('../components/Dashboard/Dashboard'));
const DashboardPage = () => {
    return (
        <Fragment>
            <MasterLayout>
              
                    <Dashboard/>
               
            </MasterLayout>
        </Fragment>
    );
};

export default DashboardPage;