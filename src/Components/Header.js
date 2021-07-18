import logoVinted from "../assets/images/vinted-logo.png";

const Header = () => {
  return (
    <header>
      <img className="logo-vinted" src={logoVinted} alt="logo Vinted" />
      <input type="text" placeholder="Rechercher des articles" />
      <button>S'inscrire</button>
      <button>Se connecter</button>
      <button>Vends tes articles</button>
    </header>
  );
};

export default Header;
