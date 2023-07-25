import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "@utils/firebase";

// const docId = "gZWELALnKoZLzJKjXGUM";

// const useSubmittedAssignment = async () => {
//   const handleSubmittedAssignment = async () => {
//     const data = await getDocs(
//       collection(db, `submittedAssignments/gZWELALnKoZLzJKjXGUM/feedbacks`),
//     );
//     data.forEach(doc => {
//       console.log(doc.data());
//     });
//   };

//   return { handleSubmittedAssignment };
// };

// export { useSubmittedAssignment };
