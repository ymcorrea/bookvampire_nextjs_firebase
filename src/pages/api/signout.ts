import { parse, serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Remove the value and expire the cookie
  const options = {
    maxAge: -1,
  };

  // Set the cookie using the 'cookie' library
  res.setHeader('Set-Cookie', serialize('session', '', options));

  res.status(200).json({});
}
