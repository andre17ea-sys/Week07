import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import EventsPage from "./pages/EventsPage";
import IndividualEvent from "./pages/IndividualEvent";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<IndividualEvent />} />
      </Routes>
    </div>
  );
}
