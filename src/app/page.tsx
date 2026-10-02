import Image from "next/image";
import Link from "next/link";
import { getArticles, formatDate } from "./lib/devto";

const PER_PAGE = 9;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);

  const articles = await getArticles(currentPage, PER_PAGE);
  const hasNext = articles.length === PER_PAGE;

  return (
    <main className="mx-auto p-10">
      <ul className="grid gap-8 lg:grid-cols-3">
        {articles.map((article) => (
          <li key={article.id} className="rounded-lg border p-4">
            <Link href={`/articles/${article.slug}?id=${article.id}`}>
              {article.cover_image && (
                <Image
                  src={article.cover_image}
                  alt={article.title}
                  width={500}
                  height={210}
                  className="rounded-lg mb-2"
                />
              )}
              <p className="mb-4 text-gray-500">
                {formatDate(article.published_at)} - {article.comments_count} comments
              </p>
              <h2 className="font-bold mb-3 text-amber-800">{article.title}</h2>
              <p>{article.description}</p>
            </Link>
          </li>
        ))}
      </ul>

      <nav className="mt-8 flex justify-between">
        {currentPage > 1 ? (
          <Link href={`/?page=${currentPage - 1}`} className="border-2 border-amber-700 px-4 py-2 rounded-lg">
              ← Page précédente
            </Link>
          ) : (
          <span />
        )}

        <span className="text-amber-700 font-semibold">Page {currentPage}</span>

        {hasNext ? (
          <Link href={`/?page=${currentPage + 1}`} className="border-2 border-amber-700 px-4 py-2 rounded-lg">Page suivante →</Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}