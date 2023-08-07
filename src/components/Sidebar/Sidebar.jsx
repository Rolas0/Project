import React from 'react';
import myLogo from '../../img/OIG-removebg-preview.png';
import GroupIcon from '@mui/icons-material/Group';
import BuildIcon from '@mui/icons-material/Build';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

import './Sidebar.scss';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="side-bar">
            <div className="logo">
                <img src={myLogo} alt="Logo" />
            </div>
            <div className="side-bar-list">
                <ul>
                    <Link className="sidebar-li-link" to="/clients">
                        <GroupIcon className="icons" />
                        <li className="list-title">Clients</li>
                    </Link>

                    <Link className="sidebar-li-link" to="services">
                        <BuildIcon className="icons" />
                        <li className="list-title">Services</li>
                    </Link>

                    <Link className="sidebar-li-link" to="parts">
                        <CarRepairIcon className="icons" />
                        <li className="list-title">Parts</li>
                    </Link>

                    <Link className="sidebar-li-link" to="history">
                        <WorkHistoryIcon className="icons" />
                        <li className="list-title">History</li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}
export default Sidebar;
