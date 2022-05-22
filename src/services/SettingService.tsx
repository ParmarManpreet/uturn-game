import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from ".."

class SettingService {
    async getTeamBuildingLogo() {
        try {
            let logoURL = ""
            const settings = doc(db, "Settings", "TeamBuildingLogo");
            const teamBuildingLogoSnapshot = await getDoc(settings)
            
            if(teamBuildingLogoSnapshot.exists()) {
                console.log("Document data:", teamBuildingLogoSnapshot.data());
                logoURL = teamBuildingLogoSnapshot!.data()!.logo
            } 
            return logoURL
        } catch (error) {
            console.log(error)
        }
    }

    async setTeamBuildingLogo(url: string) {
        try {
            const settings = doc(db, "Settings", "TeamBuildingLogo");
            await setDoc(settings, {
                logo: url
            });
            console.log("Succesfully Completed Upload");
        } catch (error) {
            console.log(error)
        }
    }

    async getCompanyLogo() {
        try {
            let logoURL = ""
            const settings = doc(db, "Settings", "CompanyLogo");
            const companyLogoSnapshot = await getDoc(settings)
            
            if(companyLogoSnapshot.exists()) {
                console.log("Document data:", companyLogoSnapshot.data());
                logoURL = companyLogoSnapshot!.data()!.logo
            } 
            return logoURL
        } catch (error) {
            console.log(error)
        }
    }

    async setCompanyLogo(url: string) {
        try {
            const settings = doc(db, "Settings", "CompanyLogo");
            await setDoc(settings, {
                logo: url
            });
            console.log("Succesfully Completed Upload");
        } catch (error) {
            console.log(error)
        }
    }

}

export default new SettingService();