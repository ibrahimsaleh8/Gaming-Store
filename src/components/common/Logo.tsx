import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.webp";
export default function Logo() {
  return (
    <Link to={"/"} className="flex gap-1">
      <p>Gaming</p>
      <img src={logoImg} className="h-5" alt="Logo Img" />
      <p className="text-yellow-text">Store</p>
    </Link>
  );
}
