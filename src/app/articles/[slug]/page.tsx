import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticle, formatDate } from "../../lib/devto";

export default async function ArticlePage({searchParams}: {searchParams: Promise<{ id?: string }>}) {
  const { id } = await searchParams;

  if (!id) {
    notFound();
  }

  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl p-8 bg-mist-100 rounded-lg">
      {article.cover_image && (
        <Image
          src={article.cover_image}
          alt={article.title}
          width={1000}
          height={420}
          priority
          className="w-full h-auto mb-2"
        />
      )}

      <p className="mb-8">
        {formatDate(article.published_at)} - {article.comments_count} comments
      </p>
      <h1 className="text-3xl font-bold mb-8 text-amber-800">{article.title}</h1>

      <div
        className="prose lg:prose-lg"
        dangerouslySetInnerHTML={{__html: article.body_html ?? ""}}
      />
    </main>
  );
}

