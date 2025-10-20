import { Link } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/">Home</Link> | <Link to="/events">Events</Link>
    </nav>
  );
}
