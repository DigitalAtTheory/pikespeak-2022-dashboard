import Card from "./Card";

export default function CardContainer({ heading, cardData }) {
  return (
    <div>
      <h1 className="heading">{heading}</h1>
      <div className="content-container">
        {cardData.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            entries={card.entries}
            location={card.location}
          />
        ))}
      </div>
    </div>
  );
}
