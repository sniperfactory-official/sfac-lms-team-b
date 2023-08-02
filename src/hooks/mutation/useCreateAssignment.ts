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
} from "firebase/firestore";
import { db } from "@utils/firebase";
import { Assignment } from "@/types/firebase.types";
import useAuth from "@/hooks/user/useAuth";

// Firestore 데이터 추가
const createAssignment = async (
  assignmentValue: Assignment,
  userId: string,
): Promise<DocumentReference> => {
  try {
    if (typeof assignmentValue.startDate === "string") {
      assignmentValue.startDate = Timestamp.fromDate(
        new Date(assignmentValue.startDate),
      );
    }
    if (typeof assignmentValue.endDate === "string") {
      assignmentValue.endDate = Timestamp.fromDate(
        new Date(assignmentValue.endDate),
      );
    }

    const assignmentsQuery = query(
      collection(db, "assignments"),
      orderBy("order", "desc"),
    );
    const querySnapshot = await getDocs(assignmentsQuery);
    const assignmentCount = querySnapshot.size;

    const addAssignment = await addDoc(collection(db, "assignments"), {
      ...assignmentValue,
      createdAt: serverTimestamp(), // 현재 시간을 타임스탬프로 설정하여 createdAt 필드에 추가
      order: assignmentCount + 1,
      userId: userId, // userId 파라미터로 전달한 값 사용
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
    (assignmentValue: Assignment) => {
      // useAuth를 통해 로그인된 사용자 정보 가져오기
      const userId = user ? user.uid : ""; // 로그인된 사용자의 uid 사용
      return createAssignment(assignmentValue, userId); // userId를 createAssignment 함수로 전달
    },

    // createAssignment,
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
