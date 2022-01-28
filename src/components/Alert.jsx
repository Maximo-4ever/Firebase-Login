export const Alert = ({ message }) => {
  return (
    <div 
      className="bg-red-200 border border-red-400 text-red-700 px-3 py-2 text-center mb-2 relative"
    >
      <span className="sm:inline block capitalize">{message}</span>
    </div>
  );
};
