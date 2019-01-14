import React from 'react'
import { Route, IndexRoute } from 'react-router'

import MainLayout from './components/MainLayout/MainLayout';
import LoginLayout from './components/LoginLayout/LoginLayout';

import StartScan from './components/StartScan/StartScan';
import ScanList from './components/ScanList/ScanList';
import Archive from './components/Archive/Archive';
import ScanResult from './components/ScanResult/ScanResult';
import Dashboard from './components/Dashboard/Dashboard';
import Settings from './components/Settings/Settings';
import Help from './components/Help/Help';
import NoMatch from './components/NoMatch/NoMatch';

import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import UserProfile from './components/UserProfile/UserProfile';

import SimplePage from './components/SimplePage/SimplePage';



import pageStore from './stores/pageStore.js';
var pages = new pageStore();


/**
 * Routes are defined here. They are loaded asynchronously.
 * Paths are relative to the "components" directory.
 * @param {Object}
 * @returns {Object}
 */
function createRoutes({ state }) {
    function requireLogin(nextState, replaceState, next) {

        state.user.getValidSession().then(()=>{
            next()
        })
        .catch(()=>{
            replaceState('/login')
            next()
        })
        
        
    }

    

    return <Route path="/">

        <Route component={LoginLayout}>
            <Route path="login" component={Login} />
            <Route path="signup" component={SignUp} />     
        </Route>  
        
        <Route component={MainLayout} onEnter={requireLogin}>
            <IndexRoute component={Dashboard} />
            <Route path="dashboard" title='Dashborad' >
                <IndexRoute component={Dashboard} />
                <Route path="startscan" component={StartScan} title='Start Scan' />
                <Route path="results" component={ScanList} title='Results' />
                <Route path="results/:idReport" component={ScanResult} title='Results'/>
                <Route path="archive" component={Archive} title='Archive' />
            </Route>

            <Route path="help" component={Help} defaultPage={pages.quickReference}  title='Help'  >
                <Route path="/help/quick-reference" component={SimplePage} page={pages.quickReference} title='Quick reference' />
                <Route path="/help/scanning" component={SimplePage} page={pages.scanning} title='Scanning' />
                <Route path="/help/review" component={SimplePage} page={pages.reviewResult} title='title 2' title='Review'  />
                <Route path="/help/exporting" component={SimplePage} page={pages.exportingResult} title='Exporting' />
            </Route>
            
            <Route path="settings" component={Settings} title='Settings' />
            
            <Route path="profile" component={UserProfile} title='Profile' />
                
            <Route path="*" component={NoMatch}/>
        </Route>

    </Route>
}

export default createRoutes