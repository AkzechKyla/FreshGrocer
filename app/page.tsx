import Header from "../components/header"
import Footer from "../components/footer"
import HeroSliders from "../components/hero-sliders"
import CategoryList from "../components/category-list"
import ProductList from "../components/product-list"

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSliders />
        <CategoryList />
        <ProductList />
      </main>
      <Footer />
    </div>
  )
}
