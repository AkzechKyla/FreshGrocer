import Header from "../components/header"

export default function Page() {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1>Welcome to FreshGrocer</h1>
        <p>Explore our wide range of products and services.</p>
      </main>
    </div>
  )
}
