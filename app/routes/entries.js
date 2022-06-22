import { json } from "@remix-run/node";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/db";

export const action = async ({ request }) => {
  const body = await request.json();

  switch (body.Form?.Id) {
    case "110":
      const hillCol = collection(db, "hill-grind-2022");
      const hillEntry = {
        basicInformation: body.BasicInformation,
        location:
          body.AreYouAttendingThePikesPeakInPerson === "I'm at the event!"
            ? "onsite"
            : "virtual",
      };

      console.log("logging entry");
      await addDoc(hillCol, hillEntry);
      console.log("entry logged");
      console.log(hillEntry);
    case "109":
      const retailCol = collection(db, "pikes-retail-2022");
      const onsiteEntry = {
        basicInformation: body.BasicInformation,
        location: "onsite",
      };

      console.log("logging entry");
      await addDoc(retailCol, onsiteEntry);
      console.log("entry logged");
      console.log(onsiteEntry);
    case "108":
      const virtualEntry = {
        basicInformation: body.BasicInformation,
        location: "virtual",
      };

      console.log("logging entry");
      await addDoc(retailCol, virtualEntry);
      console.log("entry logged");
      console.log(virtualEntry);
    default:
      console.log("This from is not being tracked on this dashboard ");
  }

  return json({ success: true }, 200);
};
