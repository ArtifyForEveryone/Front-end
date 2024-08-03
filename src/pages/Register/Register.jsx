import { Form, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

export default function Register() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [telephone, setTelephone] = useState(null);

  //Initialize form instance
  const [form] = Form.useForm();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Confirm password does not match!",
      });
      return;
    }

    const myHeaders = {
      "Content-Type": "application/json",
    };

    const data = {
      userName: userName,
      emailAddress: emailAddress,
      pass: password,
      telephone: telephone !== undefined && telephone !== "" ? telephone : null,
    };

    const emailResponse = await axios.post(
      `http://localhost:8080/api/auth/checkDuplicateEmail?emailAddress=${emailAddress}`,
      {
        myHeaders,
      }
    );
    if (emailResponse.status === 200) {
      if (emailResponse.data.payload == true) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email already registered!",
        });
        return;
      } else {
        axios
          .post("http://localhost:8080/api/auth/register", data, { headers: myHeaders })
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Success",
                html: "<h3>Register Successfully</h3>",
                showConfirmButton: false,
                timer: 1600,
              }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                  navigate("/login");
                }
              });
            } else {
              throw new Error(response.statusText);
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Register is invalid!"
            });
          });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something is wrong!"
      });
    }
  };


  return (
    <div className="w-full flex flex-col max-w-[500px]">
      <div className="w-full flex flex-col mb-10 items-center">
        <h3 className="text-5xl font-bold text-[#060606] mb-4">
          Create New Account
        </h3>
        <p className="text-black/60 italic">
          Please fill in the form to continue.
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
          onSubmit={handleRegister}
          form={form}
        >
          <Form.Item
            className="mx-0 px-0 w-full"
            name="userName"
            rules={[
              {
                required: true,
                message: "Please input your user name!",
              },
              {
                pattern: /^.{3,}$/,
                message: "Username must be greater than 3 characters!",
              },
            ]}
          >
            <Input
              className="w-full px-4 py-2.5 rounded-lg border-[#d9d9d9]"
              name="userName"
              placeholder="Enter your user name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Item>

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

          <Form.Item
            className="mx-0 px-0 w-full"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                pattern: /^.{7,}$/,
                message: "Password must be greater than 7 characters!",
              },
            ]}
          >
            <Input.Password
              className="w-full px-4 py-2.5"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            className="mx-0 px-0 w-full"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
              {
                pattern: /^.{3,}$/,
                message: "Password must be greater than 7 characters!",
              },
            ]}
          >
            <Input.Password
              className="w-full px-4 py-2.5"
              placeholder="Enter your confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            className="mx-0 px-0 w-full"
            name="telephone"
            rules={[
              {
                pattern: /^\d{10}$/,
                message: "Telephone number must be exactly 10 digits!",
              },
            ]}
          >
            <Input
              className="w-full px-4 py-2.5 rounded-lg border-[#d9d9d9]"
              placeholder="Enter your telephone number"
              name="telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </Form.Item>

          <div className="w-full flex flex-col my-3">
            <button
              className="w-full bg-[#2f6a81] border-2 text-white text- my-2 font-semibold rounded-md p-3 text-center flex items-center justify-center focus:outline-none hover:bg-gray-100 hover:text-[#2f6a81] hover:border-[#2f6a81] hover:border-2 mt-3 transition-all duration-300 cursor-pointer"
              type="submit"
              onClick={handleRegister}
              disabled={
                !form.isFieldsTouched('emailAddress') ||
                form.getFieldsError(['emailAddress']).filter(({ errors }) => errors.length).length > 0 ||
                emailAddress == null ||
                !form.isFieldsTouched('userName') ||
                form.getFieldsError(['userName']).filter(({ errors }) => errors.length).length > 0 ||
                userName == null ||
                !form.isFieldsTouched('password') ||
                form.getFieldsError(['password']).filter(({ errors }) => errors.length).length > 0 ||
                password == null ||
                !form.isFieldsTouched('confirmPassword') ||
                form.getFieldsError(['confirmPassword']).filter(({ errors }) => errors.length).length > 0 ||
                confirmPassword == null
              }
            >
              Sign Up
            </button>
          </div>
        </Form>
      </div>
      <div className="w-full flex items-center justify-center">
        <p className="text-sm font-normal text-black/70">
          Already have an account?
          <span className="font-semibold underline underline-offset-1 ml-1">
            <NavLink to={"/login"}>
              <button className="hover:outline-none hover:font-bold hover:text-[#2f6a81] underline underline-offset-2 bg-[#f5f5f5] text-red-700 ">
                Sign In
              </button>
            </NavLink>
          </span>
        </p>
      </div>
    </div >
  );
}
