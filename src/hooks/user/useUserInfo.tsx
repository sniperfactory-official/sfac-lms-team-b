import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { User } from "@/types/firebase.types";

const useUserInfo = (uid: string) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const db = getFirestore();

  useEffect(() => {
    if (uid) {
      const fetchUsername = async () => {
        const userDoc = doc(db, "users", uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          setUserInfo(userSnap.data() as User);
        }
      };

      fetchUsername();
    }
  }, [db, uid]);

  return userInfo;
};

export default useUserInfo;
