import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { fetchLiveCityData } from "@/data/githubTransformer";
import { mockCityData } from "@/data/mockCitySchema";
import ClientPage from "./ClientPage";
import LandingPage from "@/components/LandingPage";

export default async function Home() {
  const session = await getServerSession(authOptions);
  let cityData = mockCityData;
  let isAuthenticated = false;

  if (session?.accessToken) {
    try {
      cityData = await fetchLiveCityData(session.accessToken);
      isAuthenticated = true;
    } catch (error) {
      console.error("Failed to fetch live city data:", error);
      // Fallback to mock data if API fails
    }
  }

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return <ClientPage initialData={cityData} isAuthenticated={isAuthenticated} />;
}
