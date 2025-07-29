import Header from "../components/header"
import Footer from "../components/footer"
import HeroSliders from "../components/hero-sliders"
import CategoryList from "../components/category-list"

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSliders />
        <CategoryList />
        <section className="container mx-auto px-4 py-8">
          {/* Placeholder for other homepage content */}
          <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
          <p>More content will go here.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
