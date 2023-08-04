import { User } from "@/types/firebase.types";

import {
  getDoc,
  getDocs,
  collection,
  where,
  startAfter,
  limit,
  doc,
  orderBy,
  query as fireStoreQuery,
} from "@firebase/firestore";
import { db } from "@/utils/firebase";
import { useInfiniteQuery } from "@tanstack/react-query";

// 가져올 문서의 개수
const PAGE_SIZE = 6;

const getComments = async (lectureId: string, startAt: any = null) => {
  let commentsQuery = fireStoreQuery(
    collection(db, "lectureComments"),
    where("lectureId", "==", doc(db, "lectures", lectureId)),
    where("parentId", "==", ""),
    orderBy("createdAt"),
    limit(PAGE_SIZE),
  );
  if (startAt) {
    // 마지막 문서 이후에 값을 가져온다.
    commentsQuery = fireStoreQuery(commentsQuery, startAfter(startAt));
  }

  const querySnapshot = await getDocs(commentsQuery);

  // 다음페이지를 위한 정보와 현재 페이지에 대한 게시물 정보를 모두 리턴한다.
  // next는 다음 페이지를 로드하기 위한 시점(즉, 현재 페이지의 마지막 게시물)이다.
  return {
    comments: await Promise.all(
      querySnapshot.docs.map(async doc => {
        const docData = doc.data();
        const commentId = doc.id;
        const userSnap = await getDoc(docData.userId);
        const user = userSnap.data() as User;
        const userId = docData.userId.id;

        return { id: commentId, ...docData, user, userId };
      }),
    ),
    next: querySnapshot.docs[querySnapshot.docs.length - 1],
    isLastPage: querySnapshot.docs.length < PAGE_SIZE,
  };
};

const useGetComment = (lectureId: string) => {
  return useInfiniteQuery(
    ["comments"],
    async ({ pageParam = null }) => await getComments(lectureId, pageParam),
    {
      getNextPageParam: lastPage => lastPage.next,
    },
  );
};

export default useGetComment;
