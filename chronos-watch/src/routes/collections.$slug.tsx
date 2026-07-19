import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { collections, productsByCollection, type Collection } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const c = collections.find((x) => x.slug === params.slug);
    if (!c) throw notFound();
    return { collection: c };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.collection.name} — CHRONOS` : "Collection — CHRONOS" },
      {
        name: "description",
        content: loaderData ? `${loaderData.collection.name}: ${loaderData.collection.blurb}` : "CHRONOS collection.",
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="pt-40 container-x text-center">
      <h1 className="display-h text-4xl">Collection not found.</h1>
      <Link to="/collections" className="mt-6 inline-block text-gold border-b border-gold">Browse all</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="pt-40 container-x text-center">
      <h1 className="display-h text-4xl">Something went wrong.</h1>
    </div>
  ),
  component: CollectionPage,
});

function CollectionPage() {
  const { collection } = Route.useLoaderData();
  const list = productsByCollection(collection.slug as Collection);
  return (
    <div className="pt-32 md:pt-44 pb-32 container-x">
      <div className="mb-16">
        <div className="eyebrow mb-4">Collection</div>
        <h1 className="display-h text-5xl md:text-7xl">{collection.name}</h1>
        <p className="text-ink/60 mt-4 max-w-xl">{collection.blurb}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}