import { Admin } from "./pages/Admin";
import { NumberOfPlayerPage } from "./pages/NumberOfPlayerPage";
import { PlayerProfile } from "./pages/PlayerProfile";
import { UturnPage } from "./pages/UturnPage";
import { PlayerLinkPage } from "./pages/PlayerLinkPage";
import { SettingsPage } from "./pages/SettingsPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { useContext } from "react";
import { LangContext } from "./context/lang";
import { Routes, Route } from "react-router-dom";

export const Router = () => {
    const {dispatch: { translate }} = useContext(LangContext);
    return (
        <Routes>
            <Route path="/" element={<Admin translate={translate}/>} />
            {/* <Route path="/"  element={<Admin translate={function (key: string): string {
                throw new Error("Function not implemented.");
            } }/>} /> */}
            <Route path="/player-profile" element={<PlayerProfile/>} />
            <Route path="/number-players" element={<NumberOfPlayerPage/>} />
            <Route path="/player-links" element={<PlayerLinkPage/>} />
            <Route path="/settings" element={<SettingsPage translate={translate}/>} />
            <Route path="/uturn-page/:playerURL" element={<UturnPage/>} />
            <Route path="/uturn-page/" element={<UturnPage/>} />
            <Route path="/leaderboard" element={<LeaderboardPage/>} />
        </Routes>
    );
}