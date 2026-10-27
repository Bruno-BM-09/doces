
import produtos from "../data/produtos.json";
import ProductCard from "./ProductCard";

export default function ProductList() {
  return (
    <section id="produtos" className="product-section">
      <div className="products-grid">
        {produtos.map((produto) => (
          <ProductCard
            key={produto.id}
            produto={produto}
          />
        ))}
      </div>
    </section>
  );
}
