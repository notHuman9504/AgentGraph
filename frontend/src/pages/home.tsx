import { Navigate } from "react-router";

function Home() {
  return (
    <>
      <Navigate to="/playground" replace />
      <h1 className="text-3xl">Home </h1>
    </>
  );
}

export default Home;