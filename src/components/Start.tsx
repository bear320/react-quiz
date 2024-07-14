export const Start = ({ qty }: { qty: number }) => {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{qty} questions to test your react mastery</h3>
      <button className="btn btn-ui">Let's start</button>
    </div>
  );
};
