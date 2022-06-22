import { json } from "@remix-run/node";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/db";

export const action = async ({ request }) => {
  const body = await request.json();

  if (body.Form.Id === "110") {
    const colRef = collection(db, "hill-grind-2022");
    const entry = {
      basicInformation: body.BasicInformation,
      location:
        body.AreYouAttendingThePikesPeakInPerson === "I'm at the event!"
          ? "onsite"
          : "virtual",
    };

    addDoc(colRef, entry);
    console.log(entry);
  }

  console.log("Hi server");
  console.log(body);

  return json({ success: true }, 200);
};
