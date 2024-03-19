import { parse, serialize } from 'cookie';
import { auth } from "firebase-admin";
import { customInitApp } from "../../utils/firebase-admin-config";
import { NextApiRequest, NextApiResponse } from "next";

// Init the Firebase SDK every time the server is called
customInitApp();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authorization = req.headers.authorization;

  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];
    const decodedToken = await auth().verifyIdToken(idToken);

    if (decodedToken) {
      // Generate session cookie
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      });

      const cookieOptions = {
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };

      // Set the cookie using the 'cookie' library
      res.setHeader('Set-Cookie', serialize('session', sessionCookie, cookieOptions));
    }
  }

  res.status(200).json({});
}
