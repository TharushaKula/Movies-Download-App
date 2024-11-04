import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation.jsx";

function RootLayout() {
  const name = "Tharusha";

  return (
    <main>
      <Navigation name={name} />
      <Outlet />
    </main>
  );
}

export default RootLayout;
