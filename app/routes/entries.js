import { json } from "@remix-run/node";

export const action = async ({ request }) => {
  const body = await request.json();

  console.log(body);

  return json({ success: true }, 200);
};
