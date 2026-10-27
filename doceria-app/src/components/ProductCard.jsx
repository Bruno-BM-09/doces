
import { useCart } from "../context/CartContext";

const moeda = (valor) =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

export default function ProductCard({ produto }) {
  const { adicionarAoCarrinho } = useCart();

  return (
    <article className="product-card">
      <div className="product-image">
        {produto.imagem ? (
          <img
            src={produto.imagem}
            alt={produto.nome}
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder">
            <span>Imagem do produto</span>
          </div>
        )}
      </div>

      <div className="product-info">
        <h3>{produto.nome}</h3>

        <p className="product-description">
          {produto.descricao}
        </p>

        <div className="product-footer">
          <span className="price">
            {moeda(produto.preco)}
          </span>

          <button
            className="add-button"
            type="button"
            onClick={() => adicionarAoCarrinho(produto)}
            aria-label={`Adicionar ${produto.nome} ao carrinho`}
          >
            + Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}
