
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "doceria-carrinho";

export function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState(() => {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY);
      return salvo ? JSON.parse(salvo) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(carrinho)
    );
  }, [carrinho]);

  function adicionarAoCarrinho(produto) {
    setCarrinho((itens) => {
      const existente = itens.find(
        (item) => item.id === produto.id
      );

      if (existente) {
        return itens.map((item) =>
          item.id === produto.id
            ? {
                ...item,
                quantidade: item.quantidade + 1
              }
            : item
        );
      }

      return [
        ...itens,
        { ...produto, quantidade: 1 }
      ];
    });
  }

  function aumentarQuantidade(id) {
    setCarrinho((itens) =>
      itens.map((item) =>
        item.id === id
          ? {
              ...item,
              quantidade: item.quantidade + 1
            }
          : item
      )
    );
  }

  function diminuirQuantidade(id) {
    setCarrinho((itens) =>
      itens
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantidade: item.quantidade - 1
              }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function removerDoCarrinho(id) {
    setCarrinho((itens) =>
      itens.filter((item) => item.id !== id)
    );
  }

  function limparCarrinho() {
    setCarrinho([]);
  }

  const quantidadeTotal = carrinho.reduce(
    (soma, item) => soma + item.quantidade,
    0
  );

  const total = carrinho.reduce(
    (soma, item) =>
      soma + item.preco * item.quantidade,
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        aumentarQuantidade,
        diminuirQuantidade,
        removerDoCarrinho,
        limparCarrinho,
        quantidadeTotal,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const contexto = useContext(CartContext);

  if (!contexto) {
    throw new Error(
      "useCart deve ser usado dentro de CartProvider."
    );
  }

  return contexto;
}
