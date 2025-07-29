import Header from "../components/header"
import Footer from "../components/footer"
import HeroSliders from "../components/hero-sliders"

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSliders />
        <section className="container mx-auto px-4 py-8">
          <h1>Welcome to FreshGrocer</h1>
          <p>Explore our wide range of products and services.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
