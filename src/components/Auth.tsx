import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Auth({ signtype }: { signtype: "signup" | "signin" }) {
  const [postinput, setPostinput] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  async function sendReq() {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${signtype === "signup" ? "signup" : "signin"}`, postinput);
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-center items-center p-6 md:h-auto">
      <div className="text-3xl font-bold">{signtype === "signin" ? "Login to your" : "Create an"} Account</div>
      <div className="text-lg font-medium pt-2 text-gray-600 py-4">
        {signtype === "signin" ? "Don't have an account" : "Already have an account"} <Link to={signtype === "signup" ? "/signin" : "/"} className="text-zinc-400 underline">
          {signtype === "signup" ? "Login" : "Signup"}
        </Link>
      </div>
      {signtype === "signup" ? (
        <div className="w-80">
          <Labelinput
            placeholder="Enter your Username"
            label="Username"
            onChange={(e) => setPostinput({ ...postinput, username: e.target.value })}
          />
        </div>
      ) : null}
      <div className="w-80">
        <Labelinput
          placeholder="Enter your Email"
          label="Email"
          onChange={(e) => setPostinput({ ...postinput, email: e.target.value })}
        />
      </div>
      <div className="w-80">
        <Labelinput
          placeholder="Enter your Password"
          label="Password"
          onChange={(e) => setPostinput({ ...postinput, password: e.target.value })}
        />
      </div>
      <button onClick={sendReq} type="button" className="text-white w-80 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
        {signtype === "signup" ? "Signup" : "Signin"}
      </button>
    </div>
  );
}

interface labeltype {
  placeholder: string;
  label: string;
  onChange: (e: any) => void;
  typez?: string;
}

const Labelinput = ({ placeholder, label, onChange, typez }: labeltype) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-base font-medium text-gray-900">{label}</label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
        onChange={onChange}
        type={typez || "text"}
      />
    </div>
  );
};

export default Auth;
