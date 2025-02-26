import React, { useState, useEffect } from "react";

const products = [
  {
    id: 1,
    name: "Premium Watch",
    description: "Elegant timepiece for any occasion",
    price: "199.99",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=60",
    category: "Accessories",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    description: "Premium sound quality with noise cancellation",
    price: "149.99",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=60",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Smart Watch",
    description: "Track your fitness and stay connected",
    price: "299.99",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=60",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Coffee Maker",
    description: "Start your day with perfect coffee",
    price: "79.99",
    image:
      "https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?auto=format&fit=crop&w=400&q=60",
    category: "Home",
  },
  {
    id: 5,
    name: "Bluetooth Earbuds",
    description: "Portable speaker with high quality sound",
    price: "89.99",
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=400&q=60", // Updated image link
    category: "Electronics",
  },
  {
    id: 6,
    name: "Sunglasses",
    description: "Stylish and protective eyewear",
    price: "59.99",
    image:
      "https://images.unsplash.com/photo-1556306510-31ca015374b0?auto=format&fit=crop&w=400&q=60", // Updated image link
    category: "Accessories",
  },
  {
    id: 7,
    name: "Leather Bag",
    description: "Elegant and practical everyday bag",
    price: "129.99",
    image:
      "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=400&q=60", // Updated image link
    category: "Accessories",
  },
  {
    id: 8,
    name: "Running Shoes",
    description: "Comfortable shoes for everyday running",
    price: "99.99",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=60", // Updated image link
    category: "Footwear",
  },
  {
    id: 9,
    name: "Gaming Console",
    description: "Experience next-gen gaming",
    price: "399.99",
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=400&q=60", // Updated image link
    category: "Electronics",
  },
  {
    id: 10,
    name: "Office Chair",
    description: "Ergonomic chair for comfortable work hours",
    price: "249.99",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=60", // Updated image link
    category: "Home",
  },
  {
    id: 11,
    name: "Smartphone",
    description: "Latest model with cutting edge technology",
    price: "699.99",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=60",
    category: "Electronics",
  },
  {
    id: 12,
    name: "Tablet",
    description: "Portable and powerful tablet",
    price: "399.99",
    image:
      "https://images.unsplash.com/photo-1527698266440-12104e498b76?auto=format&fit=crop&w=400&q=60", // Updated image link
    category: "Electronics",
  },
];
function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [view, setView] = useState("store");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("login");

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const handleRegister = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.username === username)) {
      return false;
    } else {
      const newUser = { username, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      setUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      return true;
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const handlePurchase = () => {
    alert("Purchase successful!");
    setCart([]);
    setView("store");
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleModalType = () => {
    setModalType((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .product-card:hover {
          transform: scale(1.05);
          box-shadow: 4px 4px 12px rgba(0,0,0,0.2);
        }
      `}</style>
      <Header
        user={user}
        handleLogout={handleLogout}
        setView={setView}
        cartCount={cart.length}
        openModal={openModal}
      />
      {view === "store" ? (
        <ProductList products={products} addToCart={addToCart} />
      ) : (
        <Checkout
          cart={cart}
          onPurchase={handlePurchase}
          onBack={() => setView("store")}
        />
      )}
      {showModal && (
        <LoginModal
          modalType={modalType}
          onClose={closeModal}
          onLogin={handleLogin}
          onRegister={handleRegister}
          toggleModalType={toggleModalType}
        />
      )}
    </div>
  );
}

function Header({ user, handleLogout, setView, cartCount, openModal }) {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Online Store</h1>
      <nav style={styles.nav}>
        <button style={styles.navButton} onClick={() => setView("store")}>
          Store
        </button>
        <button style={styles.navButton} onClick={() => setView("checkout")}>
          Checkout ({cartCount})
        </button>
        {user ? (
          <span style={styles.userInfo}>
            Hi, {user.username}{" "}
            <button style={styles.navButton} onClick={handleLogout}>
              Logout
            </button>
          </span>
        ) : (
          <button style={styles.navButton} onClick={() => openModal("login")}>
            Login / Register
          </button>
        )}
      </nav>
    </header>
  );
}

function ProductList({ products, addToCart }) {
  return (
    <div style={styles.productList}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}

function ProductCard({ product, addToCart }) {
  return (
    <div style={styles.productCard} className="product-card">
      <img src={product.image} alt={product.name} style={styles.productImage} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p style={styles.price}>${product.price}</p>
      <button style={styles.button} onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

function Checkout({ cart, onPurchase, onBack }) {
  const total = cart
    .reduce((sum, product) => sum + parseFloat(product.price), 0)
    .toFixed(2);
  return (
    <div style={styles.checkout}>
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul style={styles.cartList}>
            {cart.map((product, index) => (
              <li key={index} style={styles.cartItem}>
                {product.name} - ${product.price}
              </li>
            ))}
          </ul>
          <h3>Total: ${total}</h3>
          <button style={styles.button} onClick={onPurchase}>
            Confirm Purchase
          </button>
        </>
      )}
      <button style={{ ...styles.button, marginTop: "1rem" }} onClick={onBack}>
        Back to Store
      </button>
    </div>
  );
}

function LoginModal({
  modalType,
  onClose,
  onLogin,
  onRegister,
  toggleModalType,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === "login") {
      if (!onLogin(username, password)) {
        setError("Invalid username or password");
      } else {
        onClose();
      }
    } else {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (!onRegister(username, password)) {
        setError("Username already exists");
      } else {
        onClose();
      }
    }
  };

  return (
    <div style={styles.modalOverlay} className="modal-overlay">
      <div style={styles.modalContent} className="modal-content">
        <button style={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h2>{modalType === "login" ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {modalType === "register" && (
            <input
              style={styles.input}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          {error && <p style={styles.error}>{error}</p>}
          <button style={styles.button} type="submit">
            {modalType === "login" ? "Login" : "Register"}
          </button>
        </form>
        <p>
          {modalType === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button style={styles.linkButton} onClick={toggleModalType}>
            {modalType === "login" ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1rem",
    position: "relative",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  title: { margin: 0 },
  nav: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  navButton: {
    padding: "0.5rem 1rem",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "4px",
  },
  userInfo: { display: "flex", alignItems: "center", gap: "0.5rem" },
  productList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
    animation: "fadeIn 1s",
  },
  productCard: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "1rem",
    width: "250px",
    textAlign: "center",
    boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  productImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  price: { fontWeight: "bold" },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
  },
  checkout: { maxWidth: "600px", margin: "0 auto", textAlign: "center" },
  cartList: { listStyleType: "none", padding: 0 },
  cartItem: { padding: "0.5rem 0", borderBottom: "1px solid #ccc" },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "fadeIn 0.5s",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    position: "relative",
    minWidth: "300px",
    animation: "slideDown 0.5s",
  },
  closeButton: {
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
    border: "none",
    background: "none",
    fontSize: "1.2rem",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  error: { color: "red" },
  linkButton: {
    background: "none",
    border: "none",
    color: "#007bff",
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default App;
