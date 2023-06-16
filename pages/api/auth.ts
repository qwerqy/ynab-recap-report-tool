// import { NextApiRequest, NextApiResponse } from "next";
// import { auth } from "../../lib/firebase-admin";
// import { serialize } from "cookie";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     // Signup
//     const { name, email, password } = req.body;
//     try {
//       const user = await auth.createUser({
//         name,
//         email,
//         password,
//       });
//       const token = await user.getIdToken();
//       const cookie = serialize("auth", token, {
//         maxAge: 60 * 60 * 24 * 7, // 1 week
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         path: "/",
//       });
//       res.setHeader("Set-Cookie", cookie);
//       res.status(200).json({ user });
//     } catch (error: any) {
//       res.status(400).json({ message: error.message });
//     }
//   } else if (req.method === "PUT") {
//     // Signin
//     const { email, password } = req.body;
//     try {
//       const user = await auth.signIn({
//         email,
//         password,
//       });
//       const token = await user.getIdToken();
//       const cookie = serialize("auth", token, {
//         maxAge: 60 * 60 * 24 * 7, // 1 week
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         path: "/",
//       });
//       res.setHeader("Set-Cookie", cookie);
//       res.status(200).json({ user });
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   } else if (req.method === "DELETE") {
//     // Signout
//     try {
//       const cookie = serialize("auth", "", {
//         maxAge: -1,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         path: "/",
//       });
//       res.setHeader("Set-Cookie", cookie);
//       res.status(200).json({ message: "Success" });
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }
