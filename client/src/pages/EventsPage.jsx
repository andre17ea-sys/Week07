import { useEffect, useState } from "react";
import EventForm from "../components/EventForm";
import "./EventsPage.css";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  // fetch all events
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:8080/events");
      const data = await res.json();
      setEvents(data);
    }
    fetchData();
  }, []);

  return (
    <div className="events-page">
      <div className="events-background"></div>
      {/* Title + events list */}
      <section className="events-list-section">
        <h1>All Our Fantasy Events</h1>
        {events.map((event) => (
          <div key={event.id}>
            <a href={`/events/${event.id}`}>
              {event.title} - {event.realm_name} (
              {new Date(event.date).toLocaleDateString()})
            </a>
          </div>
        ))}
      </section>

      {/* Form */}
      <section className="add-event-section">
        <h2>Here you can add your own event</h2>
        <p>
          If you want to contribute your own event, fill out the form below!
        </p>
        <EventForm setEvents={setEvents} />
      </section>
    </div>
  );
}
