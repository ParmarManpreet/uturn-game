import { Route, Routes } from "react-router";
import { Admin } from "./pages/Admin";
import { SelectPlayerPage } from "./pages/SelectPlayerPage";
import { PlayerProfile } from "./pages/PlayerProfile";
import { UturnPage } from "./pages/UturnPage";
import { PlayerLinkPage } from "./pages/PlayerLinkPage";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/player-profile" element={<PlayerProfile numberOfFacts={3}/>} />
            <Route path="/uturn-page" element={<UturnPage/>} />
            <Route path="/select-player" element={<SelectPlayerPage/>} />
            <Route path="/player-links" element={<PlayerLinkPage/>} />
        </Routes>
    );
}