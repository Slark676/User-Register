import { Link } from "react-router";
function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className="bg-gray-800 max-w-md p-30 rounded-md border border-gray-700">
        <p className="text-xl font-bold text-white p-10 text-center bg-black hover:text-sky-600 my-10">
          <Link to="/register"> Register</Link>
        </p>
        <p className="text-xl font-bold text-white p-10 text-center bg-black hover:text-sky-600">
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default HomePage;
