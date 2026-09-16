import HomePage from "../components/HomePage";
import Loader from "../components/Loader";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <main className="home">
      <Loader />
      <HomePage />
    </main>
  );
}
