import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const useUserProfileImage = (uid: string | null) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const db = getFirestore();

  useEffect(() => {
    if (uid) {
      const fetchUserProfileImage = async () => {
        const userDoc = doc(db, "users", uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
            setProfileImage(userSnap.data().profileImage);
        }
      };

      fetchUserProfileImage();
    }
  }, [db, uid]);

  return profileImage;
};

export default useUserProfileImage;
