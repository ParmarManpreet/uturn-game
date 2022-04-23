import { Route, Routes } from "react-router";
import { Admin } from "./pages/Admin";
import { PlayerProfile } from "./pages/PlayerProfile";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/player-profile" element={<PlayerProfile />} />
        </Routes>
    );
}