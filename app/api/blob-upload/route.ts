import { handleUploadPresigned, type HandleUploadPresignedBody } from "@vercel/blob/client";
import { issueSignedToken } from "@vercel/blob";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isValidSessionToken } from "../../lib/auth";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadPresignedBody;

  try {
    const jsonResponse = await handleUploadPresigned({
      body,
      request,
      getSignedToken: async (pathname) => {
        const store = await cookies();
        const authed = await isValidSessionToken(store.get(ADMIN_COOKIE_NAME)?.value);
        if (!authed) {
          throw new Error("인증되지 않은 요청입니다.");
        }

        const token = await issueSignedToken({
          pathname,
          operations: ["put"],
          maximumSizeInBytes: 50 * 1024 * 1024,
          validUntil: Date.now() + 5 * 60 * 1000,
        });

        return { token };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "업로드 처리 중 오류가 발생했습니다." },
      { status: 400 }
    );
  }
}
