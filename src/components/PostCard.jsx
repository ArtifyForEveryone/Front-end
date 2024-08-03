import { Spin } from "antd";
import axios from "axios";
import { Avatar, Card, Carousel } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { FaHeart, FaRegCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";
import InputComment from "./InputComment";

const PostCard = () => {
  const [post, setPost] = useState([]);
  const [p, setP] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState({});
  const token = localStorage.getItem("token");
  const [isLike, setIsLike] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/auth/viewAllPosts`
      );
      setPost(response.data.payload);
      setP(response.data.payload);
      console.log(response.data.payload);
    };
    setIsLoading(true);
    fetchData();
  }, []);

  return (
    <>
      <Spin spinning={!isLoading} fullscreen />
      <div className="w-full">
        {post?.length > 0
          ? post?.map((p) => (
            <Card
              key={p.postId}
              className="bg-white shadow-md shadow-gray-300 rounded-md mb-10 w-[800px] flex mx-auto h-[680px]"
            >
              <div className="flex justify-between mx-6">
                <Avatar rounded>
                  <div className="space-y-1 dark:text-white">
                    <div className="font-medium">{p.creatorName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{p.publishDate}</div>
                  </div>
                </Avatar>
                {customer.userId !== p.creatorId ? <div
                  className="cursor-pointer sm:flex gap-2 hidden items-center text-white bg-[#2f6a81] px-4 transition-all duration-300 rounded-full my-1"
                >
                  <AiOutlineUserAdd
                    size={20}
                    style={{ color: "#fff", fontWeight: "bold" }}
                  />
                  <button type="submit">Follow</button>
                </div> : <div><Link to={`/updatePost?postId=${p.postId}`}>Update Post</Link></div>}
              </div>


              <div>
                <p className="text-sm mt-1 mx-6 mb-5">{p.description}</p>
                <div className="w-full h-screen max-h-[50vh]">
                  <Carousel pauseOnHover className="mx-auto w-full">
                    {p.artList.map((item, index) => (
                      <div key={index}>
                        <Link>
                          <img
                            src={item.imagePath}
                            className="rounded-md w-[700px] mx-auto"
                            alt={`Post Image - ${p.description}`}
                          />
                        </Link>
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>

              <div className="mt-1 flex justify-between mx-6">
                <div className="flex justify-between gap-16">
                  <button className="flex gap-2 items-center">
                    <FaHeart
                      size={20}
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                    {p.numberOfLikes}
                  </button>

                  <button className="flex gap-2 items-center">
                    <FaRegCommentDots
                      size={20}
                      style={{ color: "#000", fontWeight: "bold" }}
                    />
                  </button>
                </div>
              </div>
              <InputComment postId={p.postId} />
            </Card>
          ))
          : null}
      </div>
    </>
  );
};

export default PostCard;
