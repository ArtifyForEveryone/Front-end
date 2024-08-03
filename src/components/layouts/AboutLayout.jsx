import { ConfigProvider, Tabs } from 'antd';
import { useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../..//assets/logo.png";
import "./AboutLayout.scss";

const items = [
    {
        key: '1',
        label: 'About us',
    },
    {
        key: '2',
        label: 'Privacy and Policy',
    },
];

const AboutLayout = () => {
    const navigate = useNavigate(); // Import useNavigate from react-router-dom
    const [activeTab, setActiveTab] = useState('1'); // State to keep track of active tab

    const handleTabChange = (key) => {
        setActiveTab(key);
        if (key === '2') {
            navigate('/privacy');
        } else {
            navigate('/about');
        }
    };

    return (
        <div className='h-full py-20 mt-5 bg-gray-100'>
            <img src={logo} className="w-[300px] h-[300px] mx-auto" alt="Logo" />
            <h1 className='text-center font-semibold mb-10 uppercase text-4xl'>Discover, <span className='text-[#2f6a81] font-bold'>Create,</span> Collect and <span className='text-[#2f6a81] font-bold'>Artistry Awaits</span></h1>
            <h2 className='text-center font-medium mb-20 text-base w-[700px] mx-auto'>
                At <span className='text-[#2f6a81] font-bold'>Artify</span>, we're passionate about art. Our platform connects artists and enthusiasts worldwide, making art accessible and inspiring. Join us and explore the limitless world of creativity.
            </h2>
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            itemActiveColor: '#2f6a81 !important',
                            itemHoverColor: '#2f6a81 !important',
                            itemColor: '#000000 !important',
                            itemSelectedColor: '#2f6a81 !important',
                        },
                    },
                }}
            >
                <Tabs
                    centered
                    size={'large'}
                    className='flex justify-center items-center font-bold headertab mb-5'
                    defaultActiveKey={activeTab}
                    items={items}
                    onChange={handleTabChange}
                />
            </ConfigProvider>
            <Outlet />
        </div>
    );
}
export default AboutLayout;