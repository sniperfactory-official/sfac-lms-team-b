// 임시로 component 폴더에 놨습니다.

export interface IContent {
  RUN_TIME: string;
  TITLE: string;
  CLASS_DATE: string;
}

export const MOCK_DATA: IContent[] = [
  {
    RUN_TIME: "7",
    TITLE: "[DAY1] 프론트엔드와 백엔드",
    CLASS_DATE: "2023.03.03~2023.12.12",
  },
  {
    RUN_TIME: "10",
    TITLE: "[DAY2] 프론트엔드 라이브러이",
    CLASS_DATE: "2023.04.06~2023.12.25",
  },
  {
    RUN_TIME: "15",
    TITLE: "[DAY3] 백엔드 라이브러이",
    CLASS_DATE: "2023.05.04~2023.12.27",
  },
];
