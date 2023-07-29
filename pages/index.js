import Head from "next/head";
import { styled } from "@mui/system";
import { Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useRef, useState } from "react";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import Image from "next/image";

const Container = styled(Paper)({
  width: "60vw",
  height: "50vh",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  background: "#dce6d8d1",
  display: "grid",
  gridTemplateColumns: "1fr 3fr",
  alignItems: "center",
  justifyItems: "center",
  gap: "15px",
  overflow: "auto",
  boxShadow: "1px 5px 50px 2px white",
});

const LoadingIcon = styled(HourglassBottomIcon)({
  fontSize: 50,
  color: "darkorange",
  animation: "spin 5s ease infinite",
});

const Input = (props) => {
  const inputRef = useRef();
  const submit = async () => {
    props.setFetching(true);
    const query = inputRef.current.value;
    console.log(query);
    const res = await fetch("/api/create_recipe", {
      method: "POST",
      body: query,
    });
    const results = await res.text();
    props.setFetching(false);
    props.setRecipe(results);
  };

  return (
    <>
      <div className="search_container">
        <form method="post">
          <input
            className="search"
            ref={inputRef}
            placeholder="Put in ingredients to get tasty recipes!"
            name="prompt"
          />
          <IconButton onClick={submit} aria-label="search" size="large">
            <SearchIcon fontSize="inherit" />
          </IconButton>
        </form>
      </div>
    </>
  );
};

export default function Home() {
  const [recipe, setRecipe] = useState("");
  const [fetching, setFetching] = useState(false);
  return (
    <>
      <Head>
        <title>Recipe Recommendation</title>
        <meta
          name="description"
          content="Put in ingredients as prompt to get recipe recommendation. It's gonna be tasty!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Edu+SA+Beginner&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <video autoPlay={true} muted={true} loop={true} className="bg_vid">
        <source src="bg_vid.mp4" type="video/mp4" />
      </video>
      {recipe && !fetching && (
        <div className="recipe">
          <div
            className="result_container"
            dangerouslySetInnerHTML={{ __html: recipe }}
          ></div>
          <Image
            src="/chef3.png"
            alt="chef image"
            width={350}
            height={350}
            style={{ right: "5%", bottom: "5%" }}
            className="chef_img1"
          />
        </div>
      )}
      {!recipe && (
        <Container
          style={{ display: recipe && !fetching ? "block" : "grid" }}
          elevation={20}
        >
          {!fetching && recipe === "" && (
            <div>
              <Image src={"/chef1.png"} width={190} height={300} alt={"chef"} />
            </div>
          )}
          {recipe === "" && fetching === false ? (
            <Input setFetching={setFetching} setRecipe={setRecipe} />
          ) : (
            <div
              className="result_container"
              dangerouslySetInnerHTML={{ __html: recipe }}
            ></div>
          )}
          {fetching === true && (
            <div
              style={{
                textAlign: "center",
                position: "absolute",
                top: "38%",
                left: "38%",
              }}
            >
              <div style={{ padding: 20, fontSize: 18 }}>Cooking up a dish</div>
              <LoadingIcon />
            </div>
          )}
        </Container>
      )}
      {fetching && (
        <Image
          src="/chef4.png"
          alt="chef image"
          width={300}
          height={350}
          className="chef_img2"
        />
      )}
    </>
  );
}
