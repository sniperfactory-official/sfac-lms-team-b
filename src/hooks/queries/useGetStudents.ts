import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "@utils/firebase";
import { User } from "@/types/firebase.types";

// Firestore 데이터 return
const useGetStudents = async () => {
  const q = query(collection(db, "users"), where("role", "==", "수강생"));

  const querySnapshot = await getDocs(q);
  const studentData: User[] = [];

  querySnapshot.forEach(doc => {
    const data = doc.data();
    studentData.push(data as User);
  });

  return studentData;
};

export default useGetStudents;
