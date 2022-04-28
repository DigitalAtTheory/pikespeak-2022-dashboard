import { useState, useEffect } from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/db";

import stylesUrl from "~/styles/index.css";
import lockup from "../../public/images/Corvette-Lockup.png";

export const links = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader = async () => {
  const colRef = collection(db, "ncmbash-2022");
  const snapshot = await getDocs(colRef);
  const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const onsite = data.filter((doc) => doc.location === "onsite");
  const virtual = data.filter((doc) => doc.location === "virtual");

  return json({ onsite, virtual });
};

export default function Index() {
  const { onsite, virtual } = useLoaderData();
  const [onsiteEntries, setOnsiteEntries] = useState(onsite);
  const [virtualEntries, setVirtualEntires] = useState(virtual);

  useEffect(() => {
    const colRef = collection(db, "ncmbash-2022");
    const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      const onsite = data.filter((doc) => doc.location === "onsite");
      const virtual = data.filter((doc) => doc.location === "virtual");

      setOnsiteEntries(onsite);
      setVirtualEntires(virtual);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      className="container"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
    >
      <div className="image-container">
        <img src={lockup} />
      </div>
      <h1 className="heading">NCM Bash 2022</h1>
      <div className="content-container">
        <div className="content-card onsite">
          <h2>On-Site</h2>
          <p>{onsiteEntries.length}</p>
        </div>
        <div className="content-card virtual">
          <h2>Virtual</h2>
          <p>{virtualEntries.length}</p>
        </div>
      </div>
    </div>
  );
}
