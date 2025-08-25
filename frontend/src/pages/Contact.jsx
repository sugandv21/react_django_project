import { useState } from "react";
import { API } from "../api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("contact/", form);
      alert("Message sent!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto flex flex-col gap-3">
      <input className="border p-2" placeholder="Name" required
        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input className="border p-2" type="email" placeholder="Email" required
        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="border p-2" placeholder="Phone" required
        value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
      <textarea className="border p-2" placeholder="Message" required
        value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 mt-2">
        Send
      </button>
    </form>
  );
}
