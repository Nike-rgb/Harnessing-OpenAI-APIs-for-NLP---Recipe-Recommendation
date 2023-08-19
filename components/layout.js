/*const Navbar = (props) => {
  return (
    <div className="navbar">
      <div className="logo">
        <span className="first">Recipe</span>
        <span className="second">Maker</span>
      </div>
    </div>
  );
};*/

import Image from "next/image";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Container = styled(Paper)({
  position: "absolute",
  height: "90%",
  top: "5%",
  width: "90%",
  left: "5%",
  background: "transparent",
});

export default function Layout({ children }) {
  return (
    <>
      {/*<Navbar /> */}
      <Container className="rounded-2xl" elevation={13}>
        <main>{children}</main>
      </Container>
      <Image
        src="/leaf.svg"
        alt="leaf picture"
        width={96}
        height={96}
        className="absolute bottom-0 left-0"
      />
    </>
  );
}
