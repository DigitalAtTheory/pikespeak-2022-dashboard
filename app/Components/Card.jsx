export default function Card({ title, entries, location }) {
  return (
    <div className={`content-card ${location}`}>
      <h2>{title}</h2>
      <p>{entries.length}</p>
    </div>
  );
}
