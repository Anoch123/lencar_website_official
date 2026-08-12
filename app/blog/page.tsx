import { getBlogs } from "@/lib/blog";
import { BlogCard } from "@/components/ui/BlogCard";
import { getEntryExcerpt, getEntryTitle, getEntrySlug, getEntryDate, getEntryType, getEntryImage } from "@/lib/blog";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import AllPageHero from "@/components/ui/allPageHero";
import { seoMetadata } from "@/lib/seo";

export const metadata = seoMetadata({
  title: "Lencar Journal",
  description: "Stay updated with Lencar blogs. Product updates, rider stories, and news from the road.",
  path: "/blog",
  image: "/images/Lencar-Dark-Logo.png",
});

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div>
      <AllPageHero
        eyebrow="About Lencar"
        heading={["Explore the Lencar Blog."]}
        description="Stay updated with the latest Lencar news, electric scooter tips, industry trends, and smart riding guides."
        imageSrc="/images/Blog.png"
      />

      <main className="bg-white">
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          {blogs.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-[#0b0b0c]/15 bg-[#f7f7f8] p-16 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#0F4C81]/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 6h16M4 12h16M4 18h10"
                    stroke="#0F4C81"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <h2 className="font-display mt-5 text-[22px] font-black uppercase italic text-[#0b0b0c]">
                No blog posts yet
              </h2>
              <p className="font-body mt-3 text-[15px] leading-relaxed text-[#4a4a4d]">
                Publish your first article in Contentful and it will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {blogs.map((post: any) => (
                <BlogCard
                  key={post.sys.id}
                  title={getEntryTitle(post)}
                  slug={getEntrySlug(post)}
                  excerpt={getEntryExcerpt(post)}
                  date={getEntryDate(post)}
                  blogType={getEntryType(post)}
                  imageUrl={getEntryImage(post)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}