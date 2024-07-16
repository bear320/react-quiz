export const Progress = ({
  index,
  qty,
  points,
  maxPoints,
  answer,
}: {
  index: number;
  qty: number;
  points: number;
  maxPoints: number;
  answer: number;
}) => {
  return (
    <header className="progress">
      <progress max={qty} value={index + Number(answer !== null)} />

      <p>
        Question <strong>{index + 1}</strong> / {qty}
      </p>

      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
};
