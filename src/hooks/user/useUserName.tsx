import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const useUsername = (uid: string | null) => {
  const [username, setUsername] = useState<string | null>(null);
  const db = getFirestore();

  useEffect(() => {
    if (uid) {
      const fetchUsername = async () => {
        const userDoc = doc(db, "users", uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          setUsername(userSnap.data().username);
        }
      };

      fetchUsername();
    }
  }, [db, uid]);

  return username;
};

export default useUsername;
