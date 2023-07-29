const Navbar = (props) => {
  return (
    <div className="navbar">
      <div className="logo">
        <span className="first">Recipe</span>
        <span className="second">Maker</span>
      </div>
    </div>
  );
};

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
