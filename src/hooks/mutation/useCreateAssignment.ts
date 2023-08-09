import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  addDoc,
  DocumentReference,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  Timestamp,
  doc,
  limit,
} from "firebase/firestore";
import { db } from "@utils/firebase";
import { Assignment } from "@/types/firebase.types";
import useAuth from "@/hooks/user/useAuth";

interface AssignmentWithDates extends Assignment {
  dates: {
    startDate: Date | null;
    endDate: Date | null;
  };
}

// Firestore 데이터 추가
const createAssignment = async (
  assignmentValue: Assignment,
  userId: DocumentReference,
): Promise<DocumentReference> => {
  try {
    const assignmentsQuery = query(
      collection(db, "assignments"),
      orderBy("order", "desc"),
      limit(1),
    );
    const querySnapshot = await getDocs(assignmentsQuery);
    // const assignmentCount = querySnapshot.size;
    let assignmentOrder = 1; // 기본값

    if (!querySnapshot.empty) {
      // 마지막으로 생성된 데이터가 있다면 그 다음 순서값 설정
      const lastAssignment = querySnapshot.docs[0].data();
      assignmentOrder = lastAssignment.order + 1;
    }

    const addAssignment = await addDoc(collection(db, "assignments"), {
      ...assignmentValue,
      createdAt: serverTimestamp(),
      order: assignmentOrder,
      userId: userId,
    });

    return addAssignment;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const useCreateAssignment = () => {
  const queryClient = useQueryClient();
  const user = useAuth();
  const { mutate, isLoading, error } = useMutation(
    (assignmentValue: AssignmentWithDates) => {
      // useAuth를 통해 로그인된 사용자 정보 가져오기

      const userId = user ? user.uid : "";
      const userDocRef = doc(db, "users", userId); // userId를 사용하여 DocumentReference 생성해줘야함
      return createAssignment(assignmentValue, userDocRef); // userId를 createAssignment 함수로 전달
    },

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAssignment", ""]);
      },
      onError: err => {
        console.log(err);
      },
    },
  );
  return { mutate, isLoading, error };
};

export { useCreateAssignment };
