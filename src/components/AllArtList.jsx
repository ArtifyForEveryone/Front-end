import { Select, Spin, Tag } from 'antd';
import axios from 'axios';
import { Avatar } from "flowbite-react";
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";

const AllArtList = () => {
    const [artType, setArtType] = useState("All");
    const [artPrice, setArtPrice] = useState("All");
    const [publishDate, setPublishDate] = useState("All");
    const [searchArt, setSearchArt] = useState("");
    const [artwork, setArtwork] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async (search, type, price, date) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/auth/artworkList?artworkName=${search}&artType=${type}&price=${price}&publishDate=${date}`);
            const result = response.data;
            if (result && result.payload) {
                console.log(result.payload)
                setArtwork(result.payload);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    console.log(artwork);

    useEffect(() => {
        fetchData(searchArt, artType, artPrice, publishDate);
    }, []);

    const handleChooseArtType = (event) => {
        setArtType(event);
        fetchData(searchArt, event, artPrice, publishDate);
    }

    const handleChooseArtPrice = (event) => {
        setArtPrice(event);
        fetchData(searchArt, artType, event, publishDate);
    }

    const handleChoosePublishDate = (event) => {
        setPublishDate(event);
        fetchData(searchArt, artType, artPrice, event);
    }

    const handleSearchArt = (event) => {
        setSearchArt(event.target.value);
        fetchData(event.target.value, artType, artPrice, publishDate);
    }


    return (
        <div>
            <div className='pb-10 h-full'>
                <h1 className='text-center mb-10 uppercase text-4xl text-[#2f6a81] font-bold'>All Artworks</h1>
                <Spin spinning={isLoading}>
                    <div className='px-8 md:px-16 lg:px-24 pb-16 flex justify-between items-center gap-6'>
                        <div className='bg-gray-200 rounded-lg sm:flex hidden items-center px-4 lg:w-[600px] h-12 mx-5'>
                            <AiOutlineSearch className='cursor-pointer' size={25} style={{ color: '#2f6a81', fontWeight: 'bold' }} />
                            <input
                                className='bg-transparent lg:w-[600px] appearance-none border-transparent focus:border-transparent focus:ring-0'
                                type='search'
                                placeholder='Search for artworks...'
                                value={searchArt}
                                onChange={handleSearchArt}
                            />
                        </div>

                        <div className="flex justify-end items-center gap-6">
                            <div className='flex justify-end items-center gap-2'>
                                <div className='text-base font-medium'>Art type:</div>
                                <Select
                                    defaultValue="All"
                                    style={{
                                        width: 100,
                                    }}
                                    options={[
                                        {
                                            value: 'All',
                                            label: 'All',
                                        },
                                        {
                                            value: 'Free',
                                            label: 'Free',
                                        },
                                        {
                                            value: 'Premium',
                                            label: 'Premium',
                                        },
                                    ]}
                                    onChange={handleChooseArtType}
                                />
                            </div>
                            <div className='flex justify-end items-center gap-2'>
                                <div className='text-base font-medium'>Price:</div>
                                <Select
                                    defaultValue="All"
                                    style={{
                                        width: 100,
                                    }}
                                    options={[
                                        {
                                            value: 'All',
                                            label: 'All',
                                        },
                                        {
                                            value: 'Highest',
                                            label: 'Highest',
                                        },
                                        {
                                            value: 'Lowest',
                                            label: 'Lowest',
                                        },
                                    ]}
                                    onChange={handleChooseArtPrice}
                                />
                            </div>
                            <div className='flex justify-end items-center gap-2'>
                                <div className='text-base font-medium'>Publish date:</div>
                                <Select
                                    defaultValue="All"
                                    style={{
                                        width: 100,
                                    }}
                                    options={[
                                        {
                                            value: 'All',
                                            label: 'All',
                                        },
                                        {
                                            value: 'Newest',
                                            label: 'Newest',
                                        },
                                        {
                                            value: 'Oldest',
                                            label: 'Oldest',
                                        },
                                    ]}
                                    onChange={handleChoosePublishDate}
                                />
                            </div>
                        </div>
                    </div>
                    {artwork?.length <= 0 ? (
                        <div>
                            <img
                                src='http://res.cloudinary.com/diak7ssve/image/upload/v1714799000/p5mmo5frehlk18cssyrn.png'
                                className='w-[200px] flex mx-auto mb-3'
                            />
                            <h1 className='text-center text-xl text-gray-400 font-medium'>No result found. Please try again</h1>
                        </div>
                    ) : (
                        <div className="h-full grid grid-cols-3 gap-16 sm:grid-cols-3 px-8 md:px-16 lg:px-28">
                            {artwork.map((art, index) => (
                                <div key={index} className="rounded-md w-[400px] h-[480px] mx-auto shadow-lg hover:shadow-2xl">
                                    <div>
                                        <img
                                            src={art.imagePath}
                                            className="rounded-md w-[500px] h-[320px] mx-auto cursor-pointer shadow-lg hover:shadow-2xl pointer-events-none"
                                            alt={`Artwork Image`}
                                        />
                                    </div>
                                    <div className="mx-6 mt-4 mb-2 flex justify-between items-center">
                                        <a href='' className="text-lg w-[250px] font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis hover:text-[#2f6a81] hover:underline">{art.artName}</a>
                                        <div className="flex justify-center items-center">
                                            <FaHeart
                                                size={17}
                                                style={{ color: "red", fontWeight: "bold" }}
                                            />
                                            <h2 className="text-lg font-medium ml-1.5">{art.numberOfLikes}</h2>
                                        </div>
                                    </div>
                                    <div className="mx-6 my-4 flex justify-between items-center">
                                        <div className="flex justify-center items-center h-fit">
                                            <Avatar size="sm" rounded className="mr-2" img={art.creatorImgPath} />
                                            <h2 className="text-base font-medium mt-1">{art.creatorName}</h2>
                                        </div>
                                        <div className="flex justify-center items-center h-fit mt-1">
                                            <svg className="w-6 h-6 text-[#2f6a81] dark:text-white ml-1 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28" />
                                            </svg>
                                            <h2 className="text-base font-medium">{art.createdDate}</h2>
                                        </div>
                                    </div>
                                    <div className="mx-6 mb-2 flex justify-between items-center">
                                        <h2>
                                            {art.type == "FREE" ?
                                                <Tag color='#c7c7c7' className='font-bold w-16 h-8 text-base uppercase text-center flex items-center justify-center mr-0'>{art.type}</Tag>
                                                :
                                                <Tag color='#2f6a81' className='font-bold w-24 h-8 text-base uppercase text-center flex items-center justify-center mr-0'>{art.type}</Tag>
                                            }
                                        </h2>
                                        <div className="flex justify-center items-center h-fit mt-1">
                                            <Tag color='green' className='font-bold w-16 h-8 text-base uppercase text-center flex items-center justify-center mr-2'>VND</Tag>
                                            <h2 className="text-lg font-semibold mr-0">{art.price}</h2>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Spin>
            </div>
        </div>
    )
}

export default AllArtList