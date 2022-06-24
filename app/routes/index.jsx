import { useState, useEffect } from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/db";

import stylesUrl from "~/styles/index.css";
import Card from "../Components/Card";
import CardContainer from "../Components/CardContainer";

export const links = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader = async () => {
  const retailOfferClicks = await getClicks("1db29ce2daa04228a5c129ae6ebe0b8e");
  const retailGiveawayClicks = await getClicks(
    "a6cf82d4d1614f6fb66cc3b97279829b"
  );
  const porscheGiveawayClicks = await getClicks(
    "d898d29cee6f447cbd29d9b3ca62cacf"
  );

  const hillCol = collection(db, "hill-grind-2022");
  const retailCol = collection(db, "pikes-retail-2022");
  const { onsite: hillOnsite, virtual: hillVirtual } = await getData(hillCol);
  const { onsite: retailOnsite, virtual: retailVirtual } = await getData(
    retailCol
  );

  async function getData(ref) {
    const snapshot = await getDocs(ref);
    const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const onsite = data.filter((doc) => doc.location === "onsite");
    const virtual = data.filter((doc) => doc.location === "virtual");
    return {
      onsite,
      virtual,
    };
  }

  async function getClicks(id) {
    const response = await fetch(`https://api.rebrandly.com/v1/links/${id}`, {
      headers: {
        apikey: "eca2dec1f5f940e7844b1189c01ff2bf",
      },
    });

    const link = await response.json();
    return link.clicks;
  }

  return json({
    hillOnsite,
    hillVirtual,
    retailOnsite,
    retailVirtual,
    retailOfferClicks,
    retailGiveawayClicks,
    porscheGiveawayClicks,
  });
};

export default function Index() {
  const {
    hillOnsite,
    hillVirtual,
    retailOnsite,
    retailVirtual,
    retailOfferClicks,
    retailGiveawayClicks,
    porscheGiveawayClicks,
  } = useLoaderData();
  const [retailOnsiteEntries, setRetailOnsiteEntries] = useState(retailOnsite);
  const [retailVirtualEntries, setRetailVirtualEntries] =
    useState(retailVirtual);
  const [hillOnsiteEntries, setHillOnsiteEntries] = useState(hillOnsite);
  const [hillVirtualEntries, setHillVirtualEntries] = useState(hillVirtual);

  useEffect(() => {
    const hillCol = collection(db, "hill-grind-2022");
    const retailCol = collection(db, "pikes-retail-2022");

    const hillLiveEntries = onSnapshot(hillCol, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      const onsite = data.filter((doc) => doc.location === "onsite");
      const virtual = data.filter((doc) => doc.location === "virtual");

      setHillOnsiteEntries(onsite);
      setHillVirtualEntries(virtual);
    });

    const retailLiveEntries = onSnapshot(retailCol, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      const onsite = data.filter((doc) => doc.location === "onsite");
      const virtual = data.filter((doc) => doc.location === "virtual");

      setRetailOnsiteEntries(onsite);
      setRetailVirtualEntries(virtual);
    });

    return () => {
      hillLiveEntries();
      retailLiveEntries();
    };
  }, []);

  return (
    <div
      className="container"
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
    >
      <div className="main-header">Pikes Peak</div>
      <CardContainer
        heading="Livestream Link Clicks"
        cardData={[
          {
            id: Date.now() + Math.random(),
            title: "Retail Offer",
            entries: retailOfferClicks,
            location: "onsite",
          },
          {
            id: Date.now() + Math.random(),
            title: "Retail Giveaway",
            entries: retailGiveawayClicks,
            location: "giveaway",
          },
          {
            id: Date.now() + Math.random(),
            title: "Porsche Giveaway",
            entries: porscheGiveawayClicks,
            location: "virtual",
          },
        ]}
      />
      <CardContainer
        heading="Pikes Peak Hill Grind"
        cardData={[
          {
            id: Date.now() + Math.random(),
            title: "On-site",
            entries: hillOnsiteEntries.length,
            location: "onsite",
          },
          {
            id: Date.now() + Math.random(),
            title: "Virtual",
            entries: hillVirtualEntries.length,
            location: "virtual",
          },
        ]}
      />
      <CardContainer
        heading="Pikes Peak Hill Grind"
        cardData={[
          {
            id: Date.now() + Math.random(),
            title: "On-site",
            entries: retailOnsiteEntries.length,
            location: "onsite",
          },
          {
            id: Date.now() + Math.random(),
            title: "Virtual",
            entries: retailVirtualEntries.length + 673,
            location: "virtual",
          },
        ]}
      />
    </div>
  );
}
