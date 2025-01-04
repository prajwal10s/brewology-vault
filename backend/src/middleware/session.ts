import { JwtPayload, sign, verify } from "jsonwebtoken";

export interface Session {
  id: number;
  userName: string;
}
// interface decodeResult1 {
//   session?: Session | null;
//   type: "valid" | "jwt expired" | "jwt malformed" | "jwt not active";
// }
// type decodeResult =
//   | {
//       session: string | JwtPayload;
//       type: "valid";
//     }
//   | {
//       type: "jwt expired";
//     }
//   | {
//       type: "jwt malformed";
//     }
//   | {
//       type: "jwt not active";
//     };
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
export const decodeSession: any = (secretKey: string, token: string) => {
  try {
    const session: string | JwtPayload = verify(token, secretKey);
    console.log(session);
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
