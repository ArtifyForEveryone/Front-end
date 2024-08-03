import { HomeFilled } from '@ant-design/icons';
import { Link, Outlet } from "react-router-dom";
import login from "../../assets/login.jpg";

const AuthenticationLayout = () => {
    return (
        <div className="bg-gray-100 w-full h-screen flex items-center">
            <div className="relative w-1/2 h-full flex flex-col">
                <div className="absolute top-[20%] left-[10%] flex flex-col z-10">
                    <h1 className="text-7xl text-white font-bold my-5">
                        Artify
                    </h1>
                    <p className="text-xl text-white font-normal">
                        Start for free and get attractive offers from the community
                    </p>
                </div>
                <div className="relative ml-8 mt-8 mb-8 w-100 h-full">
                    <img src={login} className="w-full h-full rounded-3xl" style={{ width: "1068px" }} />
                    <div className="absolute rounded-3xl top-0 left-0 w-full h-full bg-black opacity-50"></div>
                </div>
            </div>
            <div className="w-1/2 h-full p-10">
                <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                    <Link
                        to="/home"
                        title='Back to Home'
                    >
                        <HomeFilled className="text-xl" />
                    </Link>
                </div>
                <div className="flex flex-col justify-center items-center h-full pb-20">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default AuthenticationLayout;