import { Rate } from "antd";
import axios from "axios";
import { Avatar, Card } from "flowbite-react";
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch, AiOutlineUserAdd } from "react-icons/ai";
import { getCookie } from '../utils/CookieHandler';
import ModalComponent from "./ModalComponent";
import RequestArt from "./RequestArt";

const CardArtist = () => {

    const [artist, setArtist] = useState([]);
    var token = getCookie("token");
    console.log(token);
    if (token == null) {
        token = sessionStorage.getItem("token");
    }
    const [searchName, setSearchName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCreatorId, setSelectedCreatorId] = useState(null);


    useEffect(() => {
        fetchData(searchName);
    }, []);

    const fetchData = async (searchName) => {
        const response = await axios.get(
            `http://localhost:8080/api/auth/creatorList?creatorName=${searchName}`,
        );
        if (response) {
            setArtist(response.data.payload);
        }
    };

    const handleRequestClick = (creatorId) => {
        setSelectedCreatorId(creatorId);
        setIsModalOpen(true);
    };

    const handleSearchChange = (event) => {
        setSearchName(event.target.value);
        fetchData(event.target.value);
    };



    return (
        <div className='h-full pb-10 mb-20'>
            <h1 className='text-center mb-10 uppercase text-4xl text-[#2f6a81] font-bold'>All Artist</h1>
            <div className='bg-gray-200 rounded-lg sm:flex hidden items-center px-4 lg:w-[600px] h-12 mx-auto mb-10'>
                <AiOutlineSearch className='cursor-pointer' size={25} style={{ color: '#2f6a81', fontWeight: 'bold' }} />
                <input
                    className='bg-transparent lg:w-[600px] appearance-none border-transparent focus:border-transparent focus:ring-0'
                    type='search'
                    placeholder='Search for artists...'
                    value={searchName}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="h-full grid grid-cols-3 gap-28 sm:grid-cols-3 px-20 md:px-20 lg:px-40">
                {artist.length > 0 &&
                    artist.map((item, index) => (
                        <Card key={index} className='h-[280px]'>
                            <div className="flex flex-col items-center">
                                <Avatar rounded size="lg" img={item.imagePath} />
                                <h5 className="mt-4 mb-2 text-xl font-medium text-gray-900 dark:text-white">{item.userName}</h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                    Artist
                                </span>
                                <div className="flex justify-center items-center">
                                    <Rate className="mr-2" allowHalf value={item.overallRating} disabled />
                                    <span className="font-light text-gray-500">({item.overallRating})</span>
                                </div>
                                <div className="mt-4 flex space-x-3 lg:mt-6">
                                    <div className="cursor-pointer font-semibold border-2 sm:flex gap-2 hidden items-center text-white bg-[#2f6a81] px-4 py-2 transition-all duration-300 rounded-full  hover:bg-gray-100 hover:text-[#2f6a81] hover:border-[#2f6a81] hover:border-2">
                                        <AiOutlineUserAdd
                                            size={20}
                                            className="hover:text-[#2f6a81]"
                                        />
                                        <button type="submit">Follow</button>
                                    </div>
                                    <div className="cursor-pointer font-semibold border-2 sm:flex gap-2 hidden items-center text-white bg-[#2f6a81] px-4 py-2 transition-all duration-300 rounded-full  hover:bg-gray-100 hover:text-[#2f6a81] hover:border-[#2f6a81] hover:border-2 requestBtn">
                                        <svg className="w-6 h-6 text-white dark:text-white hover:text-[#2f6a81]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28" />
                                        </svg>
                                        <button type="button" onClick={() => handleRequestClick(item.userId)}>Request</button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
            </div>
            {artist?.length <= 0 && (
                <div className="mt-2">
                    <img
                        src='http://res.cloudinary.com/diak7ssve/image/upload/v1714799000/p5mmo5frehlk18cssyrn.png'
                        className='w-[200px] flex mx-auto mb-3'
                    />
                    <h1 className='text-center text-xl text-gray-400 font-medium'>No result found. Please try again</h1>
                </div>
            )}
            < ModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <RequestArt creatorId={selectedCreatorId} />
            </ModalComponent>
        </div >
    )
}

export default CardArtist