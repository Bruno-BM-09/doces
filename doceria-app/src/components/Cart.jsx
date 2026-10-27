
import { useCart } from "../context/CartContext";

const moeda = (valor) =>
  valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

export default function Cart() {
  const {
    carrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    removerDoCarrinho,
    limparCarrinho,
    total
  } = useCart();

  return (
    <section id="carrinho" className="cart-section">
      <div className="cart-heading">
        <div>
          <span className="eyebrow">SEU PEDIDO</span>
          <h2>Carrinho de compras</h2>
        </div>

        {carrinho.length > 0 && (
          <button
            type="button"
            className="clear-button"
            onClick={limparCarrinho}
          >
            Limpar carrinho
          </button>
        )}
      </div>

      {carrinho.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-cart-icon">🛍️</span>
          <h3>Seu carrinho está vazio</h3>
          <p>
            Que tal escolher alguns doces deliciosos?
          </p>
          <a className="add-button" href="#produtos">
            Ver produtos
          </a>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {carrinho.map((item) => (
              <article
                className="cart-item"
                key={item.id}
              >
                <div className="cart-item-info">
                  <h3>{item.nome}</h3>
                  <p>{moeda(item.preco)} por unidade</p>
                  <span className="item-subtotal">
                    Subtotal:{" "}
                    {moeda(item.preco * item.quantidade)}
                  </span>
                </div>

                <div className="cart-item-actions">
                  <div
                    className="quantity-control"
                    aria-label={`Quantidade de ${item.nome}`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        diminuirQuantidade(item.id)
                      }
                      aria-label={`Diminuir ${item.nome}`}
                    >
                      −
                    </button>

                    <span>{item.quantidade}</span>

                    <button
                      type="button"
                      onClick={() =>
                        aumentarQuantidade(item.id)
                      }
                      aria-label={`Aumentar ${item.nome}`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() =>
                      removerDoCarrinho(item.id)
                    }
                  >
                    Remover
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="cart-summary">
            <div className="total-row">
              <span>Total do pedido</span>
              <strong>{moeda(total)}</strong>
            </div>

            <p className="checkout-note">
              Frete e pagamento poderão ser definidos
              na próxima etapa.
            </p>

            <button
              type="button"
              className="checkout-button"
              onClick={() =>
                alert(
                  "Carrinho pronto! O checkout será implementado na próxima etapa."
                )
              }
            >
              Continuar compra
            </button>
          </div>
        </>
      )}
    </section>
  );
}
