import { Rate } from "antd";
import axios from "axios";
import { Avatar, Card } from "flowbite-react";
import React, { useEffect, useState } from 'react';
import { AiOutlineUserAdd } from "react-icons/ai";
import { getCookie } from '../utils/CookieHandler';
import "./HomeArtist.scss";
import ModalComponent from "./ModalComponent";
import RequestArt from "./RequestArt";

const PopularArtist = () => {

    const [artist, setArtist] = useState([]);
    var token = getCookie("token");
    console.log(token);
    if (token == null) {
        token = sessionStorage.getItem("token");
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCreatorId, setSelectedCreatorId] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                "http://localhost:8080/api/auth/creatorList/highestRating",
            );
            if (response) {
                setArtist(response.data.payload);
            }
        };
        fetchData();
    }, []);
    console.log("a", artist)

    const handleRequestClick = (creatorId) => {
        setSelectedCreatorId(creatorId);
        setIsModalOpen(true);
    };



    return (
        <div className='h-full pb-10 mb-20'>
            <h1 className='text-center mb-20 uppercase text-4xl text-[#2f6a81] font-bold'>Highest Ratings</h1>
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

            <ModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <RequestArt creatorId={selectedCreatorId} />
            </ModalComponent>
        </div>
    )
}

export default PopularArtist