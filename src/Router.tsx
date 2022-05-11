import { Route, Routes } from "react-router";
import { Admin } from "./pages/Admin";
import { NumberOfPlayerPage } from "./pages/NumberOfPlayerPage";
import { PlayerProfile } from "./pages/PlayerProfile";
import { UturnPage } from "./pages/UturnPage";
import { PlayerLinkPage } from "./pages/PlayerLinkPage";
import { SettingsPage } from "./pages/SettingsPage";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/player-profile" element={<PlayerProfile numberOfFacts={3}/>} />
            <Route path="/number-players" element={<NumberOfPlayerPage/>} />
            <Route path="/player-links" element={<PlayerLinkPage/>} />
            <Route path="/settings" element={<SettingsPage/>} />
            <Route path="/uturn-page/:playerURL" element={<UturnPage/>} />
        </Routes>
    );
}