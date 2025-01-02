import { JwtPayload, sign, verify } from "jsonwebtoken";

interface Session {
  id: number;
  userName: string;
}

export const encodeSession = async (secretKey: string, session: Session) => {
  try {
    const token: string = await sign(
      {
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
        data: session,
      },
      secretKey
    );
    return token;
  } catch (error) {
    return `Error : ${error}`;
  }
};
export const decodeSession: String | JwtPayload = (
  secretKey: string,
  token: string
) => {
  try {
    const session: String | JwtPayload = verify(token, secretKey);
    console.log(session);
    return session;
  } catch (error: any) {
    return error.message;
  }
};
