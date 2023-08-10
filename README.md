<div align="center">
  <img width=700 src="https://github.com/nanhimang/udemy-nanhimang/assets/52587871/34ca4ff1-2001-44f0-9d6b-f8f8886ceffd"/>
  <h3 align='center'> 스나이퍼팩토리 LMS 학습관리 시스템 </h3>
  
  <a href="https://www.figma.com/file/c8mYlxCSogvacib7lg3zW5/%EC%8A%A4%EB%82%98%EC%9D%B4%ED%8D%BC%ED%8C%A9%ED%86%A0%EB%A6%AC-LMS?type=design&node-id=0-1&mode=design&t=oAY8ofWmNpOXj9V1-0"><img src="https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=fff&style=flat"/></a>
  
</div>

<br/>

# 목차
- [프로그램 소개](#1-프로그램-소개)
- [기술 스택](#2-기술-스택)
- [기능 소개](#3-기능-소개)
- [팀 소개](#4-팀-소개)

<br/>

# 1. 프로그램 소개
> 학습자의 학습진행도를 파악하는 웹 플랫폼

멘토의 피드백과 수강생의 질문/커뮤니티 활동이 자유롭도록 기존의 다른 LMS 시스템에서
과제/피드백 기능을 탑재하여 제작한 스나이퍼팩토리 전용 커스텀 LMS`(Learning Managment System)`입니다.
이러한 IT 서비스 기반의 학습관리 시스템을 통해 멘토와 수강생 간의 양방향 소통을 추구하고자 합니다.

<br/>

# 2. 기술 스택
<br/>

<div align="middle">
  
|<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>|<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>|<img src="https://img.shields.io/badge/react-hook-form"/>|<img src="https://img.shields.io/badge/ReactQuery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/>|
|:-:|:-:|:-:|:-:|
|<img src="https://img.shields.io/badge/redux-toolkit"/>|<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>|<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/>|<img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black"/>|
</div>
<br/>

# 3. 기능 소개
<br/>

## 👀 미리 보기 

<div align="left">

gif 삽입

</div>

## 📂 폴더구조

``` 
📦sfac-lms-team-b
 ┣ 📂public
 ┃ ┗ 📂images
 ┣ 📂src
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📂api
 ┃ ┃ ┣ 📂assignment
 ┃ ┃ ┣ 📂classroom
 ┃ ┃ ┣ 📂community
 ┃ ┃ ┣ 📂forgotPassword
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📂resetPassword
 ┃ ┣ 📂components
 ┃ ┣ 📂constants
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📂community
 ┃ ┃ ┣ 📂lecture
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┣ 📂mutation
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📂queries
 ┃ ┃ ┣ 📂reactQuery
 ┃ ┃ ┣ 📂user
 ┃ ┣ 📂redux
 ┃ ┃ ┣ 📂slice
 ┃ ┣ 📂types
 ┃ ┣ 📂utils
 ┃ ┣ 📂__test__
 ┣ 📜.eslintignore
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜.prettierignore
 ┣ 📜.prettierrc
 ┣ 📜jest.config.js
 ┣ 📜jest.setup.js
 ┣ 📜next-env.d.ts
 ┣ 📜next.config.js
 ┣ 📜package.json
```
<br/>

## 🗄️DB 설계
- https://app.eraser.io/workspace/kGgQYva1zAO0XZUtDvDc

<div align="center">
<img width=700 src="https://github.com/nanhimang/udemy-nanhimang/assets/52587871/acdcbeea-c6c3-488e-b9cf-90751aa79b1b"/>
</div>

<br/>

## 📱 기능 상세
### 클래스룸 수강시스템 제작
> 마스터가 클래스 콘텐츠(유뷰트, S3링크, 일반링크) 등을 업로드하고 수강생의 수강률 혹은 학습진행도를 기록하는 시스템 개발

<div align="center">
<img width=400, src="https://github.com/nanhimang/udemy-nanhimang/assets/52587871/ccaac8d9-a495-48fe-aff1-482d433e8c76"/>
<img width=400, src="https://github.com/nanhimang/udemy-nanhimang/assets/52587871/abba46b1-a006-4068-a91b-a563f0578dc6"/>
</div>

<details>
<summary>
<strong>상세내용</strong>
<p align='left'>
</p>
</summary>
</details>

<br/>

### 과제제출/평가시스템 제작
> 멘토와 수강생의 과제공유 솔루션으로, 멘토의 과제 생성 기능과 <br/>수강생의 과제 제출 기능 구현을 통한 양방향 과제제출/평가시스템 개발
> 
<div align="center">
<img width=400, src="https://github.com/nanhimang/udemy-nanhimang/assets/52587871/871f6149-98e8-4744-8912-461c0ae0cfe8"/>
<img width=400, src="https://github.com/nanhimang/udemy-nanhimang/assets/52587871/cb42fe03-a41f-4936-afdd-19da6337abeb"/>
</div>

<details>
<summary>
<strong>상세내용</strong>
<p align='left'>
</p>
</summary>
</details>

<br/>

### 커뮤니티 시스템 제작
> 멘토와 수강생들 사이 질문과 자유 대화, 답글 등이 가능한 원스크롤 피드 방식의 커뮤니티 시스템 개발

<div align="center">
<img width=400, src="https://github.com/nanhimang/udemy-nanhimang/assets/52587871/ea18f622-6d38-4e4d-a28a-62fa51838c97"/>
<img width=400, src="https://github.com/nanhimang/udemy-nanhimang/assets/52587871/2ff14016-ec1c-4454-ad15-983600de3738"/>
</div>

<details>
<summary>
<strong>상세내용</strong>
<p align='left'>
</p>
</summary>
</details>

<br/>


# 4. 팀 소개

#### 👨‍👩‍👧‍👦 강의실팀

<div align="center">

|[최관수](https://github.com/gonasooc)|[신유정](https://github.com/nanhimang)|[구윤희](https://github.com/Yuni0221)|[이재훈](https://github.com/Hun5LEE)|
|:-:|:-:|:-:|:-:|
|<img width=120 src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F42cb7fa1-7be9-4a38-876e-fdd4cd5720d2%2FIMG_9898.jpg?table=block&id=8df211c4-3095-47dc-9ff5-c39a07d6c9ed&spaceId=f41e5f5b-100d-4dff-a83a-2cffb7fa7081&width=1720&userId=6c2c21ca-16da-431b-b8b8-51b261d55a98&cache=v2">|<img width=120 src="[https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6d820d11-8460-430f-a600-440b4ade23b9%2FKakaoTalk_Photo_2023-04-04-11-27-59.png?table=block&id=b18ceb0c-dcd2-4cec-923a-a8ff34748a8f&spaceId=f41e5f5b-100d-4dff-a83a-2cffb7fa7081&width=1720&userId=6c2c21ca-16da-431b-b8b8-51b261d55a98&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F11c74ee4-0f69-4c79-a599-d9bfef5e8010%2FKakaoTalk_20230605_135355748.jpg?table=block&id=d76dfb3c-7c64-462e-ad00-5a5d6f36b82a&spaceId=f41e5f5b-100d-4dff-a83a-2cffb7fa7081&width=1720&userId=6c2c21ca-16da-431b-b8b8-51b261d55a98&cache=v2)https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F11c74ee4-0f69-4c79-a599-d9bfef5e8010%2FKakaoTalk_20230605_135355748.jpg?table=block&id=d76dfb3c-7c64-462e-ad00-5a5d6f36b82a&spaceId=f41e5f5b-100d-4dff-a83a-2cffb7fa7081&width=1720&userId=6c2c21ca-16da-431b-b8b8-51b261d55a98&cache=v2">|<img width=120 src="">|<img width=120 src="https://files.slack.com/files-tmb/T058WBG0GJ1-F05M0QH9BM4-e0c9cfc2b9/img_6985_720.jpg">|

</div>

#### 👨‍👩‍👧‍👦 과제방팀

<div align="center">

|[최관수](https://github.com/gonasooc)|[신유정](https://github.com/nanhimang)|[구윤희](https://github.com/Yuni0221)|[이재훈](https://github.com/Hun5LEE)|
|:-:|:-:|:-:|:-:|
|<img width=120 src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F42cb7fa1-7be9-4a38-876e-fdd4cd5720d2%2FIMG_9898.jpg?table=block&id=8df211c4-3095-47dc-9ff5-c39a07d6c9ed&spaceId=f41e5f5b-100d-4dff-a83a-2cffb7fa7081&width=1720&userId=6c2c21ca-16da-431b-b8b8-51b261d55a98&cache=v2">|<img width=120 src="[https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6d820d11-8460-430f-a600-440b4ade23b9%2FKakaoTalk_Photo_2023-04-04-11-27-59.png?table=block&id=b18ceb0c-dcd2-4cec-923a-a8ff34748a8f&spaceId=f41e5f5b-100d-4dff-a83a-2cffb7fa7081&width=1720&userId=6c2c21ca-16da-431b-b8b8-51b261d55a98&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F11c74ee4-0f69-4c79-a599-d9bfef5e8010%2FKakaoTalk_20230605_135355748.jpg?table=block&id=d76dfb3c-7c64-462e-ad00-5a5d6f36b82a&spaceId=f41e5f5b-100d-4dff-a83a-2cffb7fa7081&width=1720&userId=6c2c21ca-16da-431b-b8b8-51b261d55a98&cache=v2)https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F11c74ee4-0f69-4c79-a599-d9bfef5e8010%2FKakaoTalk_20230605_135355748.jpg?table=block&id=d76dfb3c-7c64-462e-ad00-5a5d6f36b82a&spaceId=f41e5f5b-100d-4dff-a83a-2cffb7fa7081&width=1720&userId=6c2c21ca-16da-431b-b8b8-51b261d55a98&cache=v2">|<img width=120 src="">|<img width=120 src="https://files.slack.com/files-tmb/T058WBG0GJ1-F05M0QH9BM4-e0c9cfc2b9/img_6985_720.jpg">|

</div>

#### 👨‍👩‍👧‍👦 커뮤니티팀

<div align="center">

|[최관수](https://github.com/gonasooc)|[신유정](https://github.com/nanhimang)|[구윤희](https://github.com/Yuni0221)|[이재훈](https://github.com/Hun5LEE)|
|:-:|:-:|:-:|:-:|
|<img width=120 src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F42cb7fa1-7be9-4a38-876e-fdd4cd5720d2%2FIMG_9898.jpg?table=block&id=8df211c4-3095-47dc-9ff5-c39a07d6c9ed&spaceId=f41e5f5b-100d-4dff-a83a-2cffb7fa7081&width=1720&userId=6c2c21ca-16da-431b-b8b8-51b261d55a98&cache=v2">|<img width=120 src="[https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6d820d11-8460-430f-a600-440b4ade23b9%2FKakaoTalk_Photo_2023-04-04-11-27-59.png?table=block&id=b18ceb0c-dcd2-4cec-923a-a8ff34748a8f&spaceId=f41e5f5b-100d-4dff-a83a-2cffb7fa7081&width=1720&userId=6c2c21ca-16da-431b-b8b8-51b261d55a98&cache=v2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F11c74ee4-0f69-4c79-a599-d9bfef5e8010%2FKakaoTalk_20230605_135355748.jpg?table=block&id=d76dfb3c-7c64-462e-ad00-5a5d6f36b82a&spaceId=f41e5f5b-100d-4dff-a83a-2cffb7fa7081&width=1720&userId=6c2c21ca-16da-431b-b8b8-51b261d55a98&cache=v2)https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F11c74ee4-0f69-4c79-a599-d9bfef5e8010%2FKakaoTalk_20230605_135355748.jpg?table=block&id=d76dfb3c-7c64-462e-ad00-5a5d6f36b82a&spaceId=f41e5f5b-100d-4dff-a83a-2cffb7fa7081&width=1720&userId=6c2c21ca-16da-431b-b8b8-51b261d55a98&cache=v2">|<img width=120 src="">|<img width=120 src="https://files.slack.com/files-tmb/T058WBG0GJ1-F05M0QH9BM4-e0c9cfc2b9/img_6985_720.jpg">|

</div>
