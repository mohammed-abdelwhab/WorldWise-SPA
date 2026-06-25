import { useSearchParams } from "react-router-dom";

// Reading the postion (query string) from the URL:
export function useURLposition() {
  const [SearchParams] = useSearchParams();
  const lat = SearchParams.get("lat");
  const lng = SearchParams.get("lng");
  return [lat, lng];
}
