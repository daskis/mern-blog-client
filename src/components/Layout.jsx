import React from 'react';
import Navbar from "./Navbar";

const Layout = ({children}) => {
    return (
        <React.Fragment>
            <div className="container mx-auto px-4">
                <Navbar/>
                {children}
            </div>
        </React.Fragment>
    );
};

export default Layout;