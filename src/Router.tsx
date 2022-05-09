import { Route, Routes } from "react-router";
import { Admin } from "./pages/Admin";
import { PlayerProfile } from "./pages/PlayerProfile";
import { UturnPage } from "./pages/UturnPage";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/player-profile" element={<PlayerProfile numberOfFacts={3}/>} />
            <Route path="/uturn-page/:playerURL" element={<UturnPage/>} />
        </Routes>
    );
}