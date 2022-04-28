import { json } from "@remix-run/node";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/db";

export const action = async ({ request }) => {
  const body = await request.json();
  const colRef = collection(db, "ncmbash-2022");
  const entry = {
    location:
      body.AreYouAttendingTheNCMBashInPerson === "I'm at the event!"
        ? "onsite"
        : "virtual",
    basicInformation: body.BasicInformation,
  };

  addDoc(colRef, entry);

  console.log(entry);

  return json({ success: true }, 200);
};
