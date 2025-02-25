import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

function HeaderAdm() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // 🔹 Redireciona para a Home após sair
  };

  return (
    <header
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{
        padding: "10px 20px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand"
          style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#f39f5a" }}
        >
          🚗 Concessionária Admin
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <li className="nav-item d-flex align-items-center">
                <span
                  className="nav-link"
                  style={{
                    color: "#f39f5a",
                    fontWeight: "bold",
                    marginRight: "10px",
                  }}
                >
                  👤 {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-warning btn-sm"
                  style={{
                    borderRadius: "20px",
                    padding: "5px 15px",
                    fontSize: "0.9rem",
                  }}
                >
                  Sair
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="btn btn-warning btn-sm">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default HeaderAdm;
