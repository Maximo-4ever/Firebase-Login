import { useAuth } from "../context/authContext";

export default function Home() {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="w-full m-auto max-w-xs h-full flex items-center">
      <div className="bg-white rounded shadow-md p-8">
        <h1 className="text-2xl">Welcome {user.displayName || user.email}</h1>
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded text-base text-white mt-6">Logout</button>
      </div>
    </div>
  );
}
