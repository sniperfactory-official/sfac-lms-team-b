const emptyArrayCheck = (array: any) => {
  for (const value of array) {
    if (value === "") {
      // 빈 문자열을 발견한 경우
      return true;
    }
  }
};

export default emptyArrayCheck;
