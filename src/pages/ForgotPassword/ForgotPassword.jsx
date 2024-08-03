import { Form, Input, Spin } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [emailAddress, setEmailAddress] = useState(null);

    const handleForgotPassword = async () => {
        setIsLoading(true);
        console.log(isLoading);
        const myHeaders = {
            "Content-Type": "application/json",
        };

        const emailResponse = await axios.post(
            `http://localhost:8080/api/auth/checkDuplicateEmail?emailAddress=${emailAddress}`,
            {
                myHeaders,
            }
        );
        if (emailResponse.status === 200) {
            if (emailResponse.data.payload == false) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Email has not been registered! Please register an account.",
                });
                setIsLoading(false);
                return;
            } else {
                const resetPasswordResponse = await axios.put(
                    `http://localhost:8080/api/auth/resetPassword?emailAddress=${emailAddress}`,
                    {
                        myHeaders,
                    }
                );
                if (resetPasswordResponse.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Sucess",
                        text: "New password has been sent to your email address!",
                        confirmButtonText: "Go back to Login Page",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/login";
                        };
                    });
                    setIsLoading(false);
                    return;
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something is wrong!"
                    });
                    setIsLoading(false);
                    return;
                }
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something is wrong!"
            });
            setIsLoading(false);
            return;
        }
    };

    const [form] = Form.useForm(); // Initialize form instance

    return (
        <div className="w-full flex flex-col max-w-[500px]">
            <Spin spinning={isLoading} fullscreen />
            <div className="w-full flex flex-col mb-10 items-center">
                <h3 className="text-5xl font-bold text-[#060606] mb-4">
                    Forgot Password
                </h3>
                <p className="text-black/60 italic">
                    Please fill your registered email to continue.
                </p>
            </div>

            <div className="w-full">
                <Form
                    {...formItemLayout}
                    size="large"
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                    form={form} // Pass form instance to Form component
                >
                    <Form.Item
                        className="mx-0 px-0 w-full"
                        name="emailAddress"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                            {
                                pattern:
                                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Please input valid email!",
                            },
                        ]}
                    >
                        <Input
                            className="w-full px-4 py-2.5 rounded-lg border-[#d9d9d9]"
                            name="emailAddress"
                            placeholder="Enter your email"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item shouldUpdate>
                        {() => (
                            <div className="w-full flex flex-col">
                                <button
                                    className="w-full bg-[#2f6a81] border-2 text-white text- my-2 font-semibold rounded-md p-3 text-center flex items-center justify-center focus:outline-none hover:bg-gray-100 hover:text-[#2f6a81] hover:border-[#2f6a81] hover:border-2 mt-3 transition-all duration-300 cursor-pointer"
                                    type="submit"
                                    onClick={handleForgotPassword}
                                    disabled={
                                        !form.isFieldsTouched('emailAddress') ||
                                        form.getFieldsError(['emailAddress']).filter(({ errors }) => errors.length).length > 0 ||
                                        emailAddress == null
                                    }
                                >
                                    Reset password
                                </button>
                            </div>
                        )}
                    </Form.Item>
                </Form>
            </div>
            <div className="w-full flex items-center justify-center">
                <p className="text-sm font-normal text-black/70">
                    Don't have an account?
                    <span className="font-semibold underline underline-offset-1 ml-1">
                        <NavLink to={"/register"}>
                            <button className="hover:outline-none hover:text-[#2f6a81] underline underline-offset-2 bg-[#f5f5f5] text-red-700 hover:font-bold">Sign Up for free</button>
                        </NavLink>
                    </span>
                </p>
            </div>
        </div >
    );
}