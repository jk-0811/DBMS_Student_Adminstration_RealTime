import { useTheme } from "../context/ThemeContext";

function Navbar() {

  const { dark, setDark } = useTheme();

  return (
    <nav>

      <h2>SAMS</h2>

      <button
        onClick={() => setDark(!dark)}
      >
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>

    </nav>
  );
}

export default Navbar;