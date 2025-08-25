import { useState } from "react";
import { API } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm_password: "" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState(""); // <-- new state for error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      await API.post("register/", form);
      alert("Registered successfully. Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      // Check if backend returned a response
      if (err.response && err.response.data) {
        // Display first error message from backend
        const messages = Object.values(err.response.data).flat();
        setError(messages.join(" | "));
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto flex flex-col gap-3">
      {error && <p className="text-red-600 font-medium">{error}</p>}
      <input
        placeholder="Name" required className="border p-2"
        value={form.username} onChange={e => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="email" placeholder="Email" required className="border p-2"
        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <div className="relative">
        <input
          type={show ? "text" : "password"} placeholder="Password" required className="border p-2 w-full"
          value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setShow(!show)}>
          {show ? "view" : "hide"}
        </span>
      </div>
      <input
        type={show ? "text" : "password"} placeholder="Confirm Password" required className="border p-2"
        value={form.confirm_password} onChange={e => setForm({ ...form, confirm_password: e.target.value })}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Register</button>
      <p className="text-sm mt-2">
        Already have an account? <Link to="/login" className="text-blue-600 underline">Login</Link>
      </p>
    </form>
  );
}
