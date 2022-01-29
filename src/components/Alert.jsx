export const Alert = ({ message }) => {
  return (
    <div 
      className={`bg-red-200 border border-red-400 text-red-700 px-3 py-3 text-center mb-5 relative rounded w-96 ${message ? "visible" : "invisible"}`}
    >
      <span className="sm:inline block capitalize">{message ? message : "</>"}</span>
    </div>
  );
};
