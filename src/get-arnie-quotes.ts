import { httpGet } from "./mock-http-interface";

interface TResult {
  [key: string]: string;
}

interface FetchedResultsInterface {
  [key: string]: Promise<{ status: number; body: string }>;
}

/** Used to chache data already fetched, so httpget is not called twice */
const fetchedResults: FetchedResultsInterface = {};

export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {
  const results = [];
  for (let i = 0; i < urls.length; i++) {
    if (!fetchedResults[urls[i]]) {
      fetchedResults[urls[i]] = httpGet(urls[i]);
    }

    results.push(await fetchedResults[urls[i]]);
  }

  return results.map((result) => ({
    [result.status === 200 ? "Arnie Quote" : "FAILURE"]: JSON.parse(result.body)
      .message,
  }));
};
