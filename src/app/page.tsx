import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { fetchLiveCityData } from "@/data/githubTransformer";
import ClientPage from "./ClientPage";
import LandingPage from "@/components/LandingPage";
import EmptyStatePage from "@/components/EmptyStatePage";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return <LandingPage />;
  }

  try {
    const cityData = await fetchLiveCityData(session.accessToken);
    
    // If the user has no repositories, show the empty state
    if (!cityData.districts || cityData.districts.length === 0) {
      return <EmptyStatePage user={cityData.user} />;
    }

    return <ClientPage initialData={cityData} />;
  } catch (error) {
    console.error("Failed to fetch live city data:", error);
    // In a production app, we might return a custom ErrorPage here.
    // For now, if the API call fails, we revert to the Landing Page.
    return <LandingPage />;
  }
}
