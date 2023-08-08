export const setCookies = async ({ user, result }: any) => {
  const userData = {
    name: user.username,
    role: user.role,
    uid: result.user.uid,
  };
  // 쿠키 설정
  const response = await fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (response.ok) {
    // 쿠키 설정이 성공적으로 완료된 후에만 '/' 경로로 리다이렉트
    console.log("move");
    window.location.href = "/classroom";
  } else {
    // 에러 처리
  }
};

export const deleteCookies = async () => {
  await fetch("/api", {
    // '/api/yourApiRouteName' 부분을 실제 API 라우트 경로로 변경해주세요.
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getCookies = async () => {
  try {
    const response = await fetch("/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }); // GET 함수의 경로를 지정해야 합니다.
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
