import { useState } from "react";
import { API } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("login/", { email, password });
      setUser(res.data);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto flex flex-col gap-3">
      <input type="email" placeholder="Email" required
        className="border p-2" value={email} onChange={e => setEmail(e.target.value)} />
      <div className="relative">
        <input type={show ? "text" : "password"} placeholder="Password" required
          className="border p-2 w-full" value={password} onChange={e => setPassword(e.target.value)} />
        <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShow(!show)}>
          {show ? "view" : "hide"}
        </span>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Login</button>
      <p className="text-sm mt-2">Don't have an account? <Link to="/register" className="text-blue-600 underline">Register</Link></p>
    </form>
  );
}
