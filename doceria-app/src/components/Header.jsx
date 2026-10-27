
import { useCart } from "../context/CartContext";

export default function Header() {
  const { quantidadeTotal } = useCart();

  return (
    <header className="header">
      <a className="brand" href="#produtos">
        Doces Gamers
      </a>

      <nav className="navigation">
        <a href="#produtos">Produtos</a>
        <a href="#carrinho">
          Carrinho ({quantidadeTotal})
        </a>
      </nav>
    </header>
  );
}
