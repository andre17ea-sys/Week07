import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function IndividualEvent() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  // fetch a single event by id
  useEffect(() => {
    async function fetchEvent() {
      const res = await fetch(`https://week07-ridv.onrender.com/events/${id}`);
      const data = await res.json();
      setEvent(data);
    }
    fetchEvent();
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      <p>Realm: {event.realm_name}</p>
    </div>
  );
}
