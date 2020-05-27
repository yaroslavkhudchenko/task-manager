import React from 'react';
import '../css/Header.scss';
import { AddProject } from './../Hooks/AddProject';

const Header = () => 
    <div className="Header">
        <div className='addBoard' onClick={AddProject}>Add</div>
    </div>
   

export default Header;