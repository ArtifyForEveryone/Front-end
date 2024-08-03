import { Checkbox, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import React, { useState } from "react";
import GoogleButton from 'react-google-button';
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { setCookie } from '../../utils/CookieHandler';
import "./Login.scss";

const formItemCol = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [remember, setRemember] = useState(false);

  //Remember me button
  const handleChange = () => {
    setRemember(!remember);
  };

  //Initialize form instance
  const [form] = Form.useForm();

  //Handle login
  const handleLogin = () => {
    const myHeaders = {
      "Content-Type": "application/json",
    };

    const data = {
      email: email,
      pass: password,
    };

    axios
      .post("http://localhost:8080/api/auth/login", data, { headers: myHeaders })
      .then((response) => {
        console.log(response.data.payload);
        if (response.status === 200) {
          const token = response.data.payload.token;
          if (remember) {
            setCookie("token", token, 30); // Expires in 30 days
            sessionStorage.setItem("token", token);
          } else {
            sessionStorage.setItem("token", token);
          }
          console.log(remember);
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Welcome`,
            html: "<h3>Login Successfully</h3>",
            showConfirmButton: false,
            timer: 1600
          }).then(() => {
            navigate("/home");
          });
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email or password is invalid!"
        });
      });
  };

  //Forgot password
  const forgotPassword = () => {
    navigate("/forgotPassword");
  }

  return (
    <div className="w-full flex flex-col max-w-[500px]">
      <div className="w-full flex flex-col mb-10 items-center">
        <h3 className="text-5xl text-[#060606] font-bold mb-4">
          Login
        </h3>
        <p className="text-black/60 mb-2 italic">
          Welcome Back! Please enter your details.
        </p>
      </div>

      <div className="w-full">
        <Form
          {...formItemCol}
          size="large"
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onSubmit={handleLogin}
          form={form}
        >
          <Form.Item
            className="mx-0 px-0 w-full pt-5"
            name="email"
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
              className="w-full px-5 py-2.5 rounded-lg border-[#d9d9d9]"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            className="mx-0 px-0 w-full pt-5"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              }
            ]}
          >
            <Input.Password
              className="w-full px-5 py-2.5"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            {...formItemCol}
          >
            <div
              className="flex items-center"
              style={{ justifyContent: "space-between", width: "100%" }}
            >
              <Checkbox checked={remember} onChange={handleChange}>Remember for 30 days</Checkbox>
              <p onClick={forgotPassword} className="font-bold cursor-pointer hover:text-[#2f6a81]">Forgot Password?</p>
            </div>
          </Form.Item>

          <FormItem shouldUpdate>
            <div className="w-full flex flex-col">
              <button
                className="w-full bg-[#2f6a81] border-2 text-white text- my-2 font-semibold rounded-md p-3 text-center flex items-center justify-center focus:outline-none hover:bg-gray-100 hover:text-[#2f6a81] hover:border-[#2f6a81] hover:border-2 mt-3 transition-all duration-300 cursor-pointer"
                type="submit"
                onClick={handleLogin}

              >
                Sign In
              </button>
            </div>
          </FormItem>
        </Form>

        <div className="w-full py-2 flex items-center justify-center relative">
          <div className="w-full h-[1px] bg-black/25"></div>
          <p className="absolute  p-2 text-black/60 bg-[#f5f5f5]">or</p>
        </div>

        <div className="w-full flex items-center justify-center my-4 googlebutton">
          <GoogleButton
            type="light"
            style={{
              width: "100%",
              borderRadius: "0.375rem",
              fontSize: ".9em",
              paddingLeft: "-30px"
            }}
            className="my-2"
            onClick={() => alert("Google button clicked")}
            label="Sign in with Google"
          />
        </div>
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
    </div>
  );
}
