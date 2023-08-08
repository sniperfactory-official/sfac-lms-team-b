import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest, response:NextResponse){
  const userCookies = cookies();  // 쿠키 정보 가져오기
  // 쿠키 정보를 JSON 형태로 반환

  const res = {
    uid : userCookies.get('uid'),
    name : userCookies.get('name'),
  }
  return NextResponse.json({
    uid: userCookies.get('uid'),
    name: userCookies.get('name')
  });
  
  // Do something with the cookies...
}

export async function POST(request: NextRequest) {
  const user = await request.json();

  const response = NextResponse.json(
    { message: 'User information set successfully' },
    { status: 200 }
  )

  // User 객체의 각 키와 값을 반복하여 쿠키로 설정
  for (const [key, value] of Object.entries(user)) {
    response.cookies.set({
      name: key,
      value: String(value),  // 쿠키 값은 문자열이어야 하므로 String()을 사용하여 변환
      httpOnly: true,
      maxAge: 60 * 60,
    });
  }

  return response
}

export async function DELETE(request: NextRequest) {
  const response = new NextResponse();

  // 'uid', 'name', 'role' 쿠키를 삭제
  ['uid', 'name', 'role'].forEach(cookieName => {
    response.cookies.delete(cookieName);
  });

  return response;
}