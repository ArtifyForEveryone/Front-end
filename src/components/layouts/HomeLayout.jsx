import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import FooterPart from '../../components/FooterPart';
import NavBar from '../../components/NavBar';


const Home = () => {
    return (
        <div className='w-full bg-gray-100'>
            <div className="flex justify-center items-center ">
                <div className="w-full">
                    <Fragment>
                        <NavBar />
                        <Outlet />
                        <FooterPart />
                    </Fragment>
                </div>
            </div>
        </div>
    )
}
export default Home;