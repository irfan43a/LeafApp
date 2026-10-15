import type { WikipediaSummary } from '../types/plant';

export async function fetchWikipediaPlantSummary(title: string): Promise<WikipediaSummary | null> {
  try {
    // Try Indonesian Wikipedia first
    const idUrl = `https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const resId = await fetch(idUrl);
    
    if (resId.ok) {
      const data = await resId.json();
      if (data && data.extract) {
        return {
          title: data.title,
          extract: data.extract,
          description: data.description,
          thumbnail: data.thumbnail,
          originalimage: data.originalimage,
          content_urls: data.content_urls
        };
      }
    }

    // Fallback to English Wikipedia
    const enUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const resEn = await fetch(enUrl);
    if (resEn.ok) {
      const data = await resEn.json();
      if (data && data.extract) {
        return {
          title: data.title,
          extract: data.extract,
          description: data.description,
          thumbnail: data.thumbnail,
          originalimage: data.originalimage,
          content_urls: data.content_urls
        };
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching Wikipedia summary:', error);
    return null;
  }
}

export interface WikiSearchResult {
  title: string;
  snippet: string;
}

export async function searchWikipediaPlants(query: string): Promise<WikiSearchResult[]> {
  if (!query || query.trim().length === 0) return [];
  
  try {
    const url = `https://id.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=10&namespace=0&format=json&origin=*`;
    const res = await fetch(url);
    if (!res.ok) return [];

    const data = await res.json();
    // data format: [search_term, [titles], [descriptions], [links]]
    const titles: string[] = data[1] || [];
    const snippets: string[] = data[2] || [];

    return titles.map((title, idx) => ({
      title,
      snippet: snippets[idx] || 'Informasi taksonomi dan botani dari Wikipedia'
    }));
  } catch (error) {
    console.error('Error searching Wikipedia:', error);
    return [];
  }
}
