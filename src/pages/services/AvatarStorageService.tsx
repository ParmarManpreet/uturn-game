import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../..";


//const storage = getStorage();
const storageRef = ref(storage);
const avatarRef = ref(storageRef, 'Avatars')


export async function AvatarStorageService(fileName: string, file: Blob) {
 
    //iconFolderRef: firebase.storage.Reference = storageRef

    //async addAvatar(fileName: string, file: Blob) {
        try {
            await uploadBytes(avatarRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
              });
        } catch(error) {
            console.log(`Cannot add the icon with name: ${fileName}\n ${error}`)
        }
   // }

    // async getAvatarByFileName(fileName: string) {
    //     try {
    //         const url = await getDownloadURL(ref(storage, fileName))
    //         const data: IconDetails = {
    //             name: fileName,
    //             iconURL: url,
    //         }
    //         return data
    //     } catch (error) {
    //         console.log(`Unable to get the Icon with name: ${fileName} \n ${error}`)
    //     }
    // }
}