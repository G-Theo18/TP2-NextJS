export type Article = {
  id: number;
  title: string;
  slug: string;
  path: string;
  description: string;
  cover_image: string;
  published_at: string;
  comments_count: number;
  body_html?: string;
};

const API_URL = "https://dev.to/api/articles";
const DEFAULT_COVER ="https://placehold.co"

export async function getArticles(
  page: number,
  perPage: number
): Promise<Article[]> {
  const res = await fetch(`${API_URL}?page=${page}&per_page=${perPage}`);

  if (!res.ok) {
    throw new Error(`Erreur API dev.to : ${res.status}`);
  }

  const articles: any[] = await res.json();

  return articles.map((article) => ({
    ...article,
    cover_image: article.cover_image || DEFAULT_COVER,
  }));
}

export async function getArticle(id: string): Promise<Article | null> {
  const res = await fetch(`${API_URL}/${id}`);

  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`Erreur API dev.to : ${res.status}`);
  }

  const article = await res.json();

  if (article) {
    article.cover_image = article.cover_image || DEFAULT_COVER;
  }

  return article;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    timeZone: "Europe/Paris",
  });
}