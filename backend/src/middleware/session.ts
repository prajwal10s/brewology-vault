import { JwtPayload, sign, verify } from "jsonwebtoken";

export interface Session {
  id: number;
  userName: string;
}
export const encodeSession = async (secretKey: string, session: Session) => {
  try {
    const token: string = await sign(
      {
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 15 * 60,
        data: session,
      },
      secretKey
    );
    return token;
  } catch (error) {
    return `Error : ${error}`;
  }
};
export const decodeSession: any = (secretKey: string, token: string) => {
  try {
    const session: string | JwtPayload = verify(token, secretKey);
    return {
      session,
      type: "valid",
    };
  } catch (error: any) {
    return {
      type: error.message,
    };
  }
};
