import { Rate, Tag } from "antd";
import axios from "axios";
import { Table } from "flowbite-react";
import moment from 'moment';
import React, { useEffect, useState } from "react";
import FooterPart from '../../components/FooterPart';
import NavBar from "../../components/NavBar";
const CompletePreorders = () => {
    const token = localStorage.getItem("token");
    const [requestList, setRequestList] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);


    // useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get(
            "http://localhost:8080/api/auth/viewCompletedPreOrders",
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        console.log(response);
        setRequestList(response.data.payload);
    };
    // fetchData();
    // }, []);


    const cancelRequest = async (item) => {
        try {
            await axios.delete(
                `http://localhost:8080/api/auth/audience/cancel?preorderId=${item.preOrderId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const updatedList = requestList.filter(
                (request) => request.preOrderId !== item.preOrderId
            );
            setRequestList(updatedList);
        } catch (error) {
            console.error("Error cancelling request: ", error);
        }
    };


    return (
        <div className="w-full h-full bg-gray-100">
            <NavBar />
            <div className="h-full p-28 mt-5">
                <h1 className="text-center text-3xl font-semibold mb-10 text-[#2f6a81]">
                    Complete History
                </h1>

                <div className="overflow-x-auto">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell>No</Table.HeadCell>
                            <Table.HeadCell>Creator</Table.HeadCell>
                            <Table.HeadCell>Pre-order Date</Table.HeadCell>
                            <Table.HeadCell>Requirement</Table.HeadCell>
                            <Table.HeadCell>Price</Table.HeadCell>
                            <Table.HeadCell>Image</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell>Creator Note</Table.HeadCell>
                            <Table.HeadCell>Audience Rating</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {requestList.length > 0 && requestList.map((item, index) =>
                                <Table.Row key={item.preOrderId} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {index + 1}
                                    </Table.Cell>
                                    <Table.Cell>{item.creatorName}</Table.Cell>
                                    <Table.Cell>{moment(item.preOrderDate).format('DD/MM/YYYY')}</Table.Cell>
                                    <Table.Cell>{item.requirement}</Table.Cell>
                                    <Table.Cell>{item.price} VND</Table.Cell>
                                    <Table.Cell>
                                        <img src={item.artworkImagePath} className="w-[700px]" />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Tag color={item.status === 'PENDING' ? 'volcano' : 'green'}>
                                            {item.status}
                                        </Tag>
                                    </Table.Cell>
                                    <Table.Cell>{item.creatorNote}</Table.Cell>
                                    <Table.Cell><Rate value={item.audienceRating} disabled /></Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </div>
            </div>
            <FooterPart />
        </div>
    );
};

export default CompletePreorders;
