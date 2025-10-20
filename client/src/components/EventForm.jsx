import { useState } from "react";

export default function EventForm({ setEvents }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // send title, description și date
    const res = await fetch("http://localhost:8080/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const newEvent = await res.json();
    setEvents((prev) => [...prev, newEvent]);

    setFormData({
      title: "",
      description: "",
      date: "",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="title"
        value={formData.title}
        onChange={handleChange}
      />
      <input
        name="description"
        placeholder="description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
