import { IToken } from "./token";
import { createHmac } from "crypto";
import { User } from "../../modules/users/entities/user.entity";
import { sign, verify } from "jsonwebtoken";

export class JWTtoken implements IToken {
  private SECRET_TOKEN = process.env.SECRET_KEY || "";
  private SECRET_TOKEN_CRYPTO = createHmac("sha512", this.SECRET_TOKEN).digest(
    "base64"
  );

  create(data: User): string {
    const token = sign(
      {
        user: {
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          picturePath: data.picturePath,
          friends: [],
          location: data.location,
          occupation: data.occupation,
          viewedProfile: data.viewedProfile,
          impressions: data.impressions,
        },
      },
      this.SECRET_TOKEN_CRYPTO,
      {
        subject: data.id,
        expiresIn: "30m",
      }
    );
    return token;
  }

  valite(token: string): boolean {
    try {
      verify(token, this.SECRET_TOKEN_CRYPTO);
      return true;
    } catch (err: any) {
      return false;
    }
  }
}
