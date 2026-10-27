
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Header />

      <main className="container">
        <ProductList />
        <Cart />
      </main>
    </CartProvider>
  );
}
