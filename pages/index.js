/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import Image from "next/image";
import { animated, useSpring } from "@react-spring/web";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LinearProgress from "@mui/material/LinearProgress";
import { Paper } from "@mui/material";
import styled from "@emotion/styled";
import Rating from "@mui/material/Rating";

const dishNames = [
  "Spaghetti Carbonara",
  "Chicken Parmesan",
  "Sushi Rolls",
  "Pad Thai",
  "Beef Stroganoff",
  "Caesar Salad",
  "Pizza Margherita",
  "Chicken Alfredo",
  "Miso Mushroom Soup",
  "Fish and Chips",
  "Chocolate Fondue",
  "Steak Sauce Katti Rolls",
  "Cesar Salad",
  "Pasta Primavera",
  "Chicken Curry",
  "Sushi Sashimi Platter",
  "Burger with Fries",
];

const CommentContainer = styled(Paper)({});

const Loading = () => {
  const loadings = [
    "Preparing your dish",
    "Nice choice of ingredients there!",
    "Something is smelling real good.",
    "It's taking longer than usual. Are you sure you are connected to the internet?",
  ];

  const animationConfig = {
    duration: 3000,
  };

  const springs1 = useSpring({
    from: { x: 0, opacity: 0 },
    to: { x: 100, opacity: 1 },
    config: { duration: 1500 },
  });

  const springs2 = useSpring({
    from: { x: -500, y: 200, opacity: 0 },
    to: { x: -300, y: 200, opacity: 1 },
    config: { duration: 2000 },
  });

  const springs3 = useSpring({
    from: { x: 200, y: 100, opacity: 0 },
    to: { x: 100, y: 200, opacity: 1 },
    config: { duration: 2000 },
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % loadings.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="absolute grid justify-items-center gap-6 w-[60%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <animated.div style={{ ...springs1 }}>
        <CommentContainer
          elevation={15}
          style={{ animation: "" }}
          className={`absolute grid items-center rounded-lg p-2 px-3 w-56 grid grid-cols-3`}
        >
          <Image src={"food2.svg"} width={48} height={48} alt="food image" />
          <div className="col-span-2 grid gap-1">
            <span className="text-xs">I made this!</span>
            <Rating
              name="read-only"
              value={4.5}
              size="small"
              precision={0.5}
              readOnly
            />
          </div>
        </CommentContainer>
      </animated.div>

      <animated.div style={{ ...springs2 }}>
        <CommentContainer
          elevation={15}
          style={{ animation: "" }}
          className={`absolute grid items-center rounded-lg p-1 px-3 w-56 grid grid-cols-3`}
        >
          <Image src={"food1.svg"} width={48} height={48} alt="food image" />
          <div className="col-span-2 grid gap-1">
            <span className="text-xs">
              Surprised my bf with this. He loved it!
            </span>
            <Rating
              name="read-only"
              value={4}
              size="small"
              precision={0.5}
              readOnly
            />
          </div>
        </CommentContainer>
      </animated.div>

      <animated.div style={{ ...springs3 }}>
        <CommentContainer
          elevation={15}
          style={{ animation: "" }}
          className={`absolute grid items-center rounded-lg p-1 px-3 w-56 grid grid-cols-3`}
        >
          <Image src={"dessert.svg"} width={48} height={48} alt="food image" />
          <div className="col-span-2 grid gap-1">
            <span className="text-xs">
              I never knew I could make my own ice-cream
            </span>
            <Rating
              name="read-only"
              value={5}
              size="small"
              precision={0.5}
              readOnly
            />
          </div>
        </CommentContainer>
      </animated.div>

      <Image
        src={"/chef.png"}
        width={300}
        height={300}
        alt={"Preparing your recipe"}
      />
      <div
        className="mt-16"
        style={{ fontFamily: "Playfair Display SC", color: "grey" }}
      >
        {loadings[currentIndex]}
      </div>
      <LinearProgress
        style={{
          width: "40%",
          background: "radial-gradient(#591689, transparent)",
        }}
        color="success"
      />
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const [currentDishIndex, setCurrentDishIndex] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [springs, api] = useSpring(() => ({
    from: { y: -50 },
    to: { y: 0 },
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDishIndex((prevIndex) => (prevIndex + 1) % dishNames.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    api.start({
      from: { y: -30 },
      to: { y: 0 },
    });
  }, [currentDishIndex]);

  const search = async (e) => {
    e.preventDefault();
    setFetching(true);
    const form = document.querySelector("#search_form");
    const formData = new FormData(form);
    let query;
    for (let [key, value] of formData) {
      if (key === "query") {
        query = value;
      }
    }
    router.push({
      pathname: "/create",
      query: { query },
    });
  };
  return (
    <>
      <Head>
        <title>RecipeMaker | Home</title>
        <meta
          name="description"
          content="Get recipe recommendation from you
          r ingredients"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {fetching && <Loading />}
      {!fetching && (
        <>
          <div className="p-20 grid gap-4 items-center grid-cols-7">
            <div className="col-span-3 grid gap-16 items-center justify-items-center">
              <div
                className="text-4xl tracking-wide leading-normal"
                style={{
                  fontFamily: "Playfair Display SC",
                  color: "#488817",
                }}
              >
                It&apos;s not just Food<br></br>It&apos;s an Experience!
              </div>
              <form
                method="POST"
                className="w-[75%]"
                id="search_form"
                name="form"
                onSubmit={search}
              >
                <div
                  className="flex p-1 items-center gap-2 rounded-xl bg-white"
                  style={{
                    boxShadow:
                      "11px 8px 11px 0px rgba(0, 0, 0, 0.11) inset, -4px -4px 10px 0px #FFF inset",
                  }}
                >
                  <input
                    className="bg-transparent outline-none flex-[0.85] p-2 text-center text-lg"
                    placeholder="Try flour, egg, milk, cheese"
                    name="query"
                  />
                  <span className="text-center flex-[0.15]">
                    <i className="text-2xl text-orange-400 fa-solid fa-magnifying-glass"></i>
                  </span>
                </div>
              </form>
              <div className="grid gap-4 grid-cols-4 items-center">
                <Image
                  alt="food image"
                  className=""
                  src={"/food1.svg"}
                  width={86}
                  height={86}
                />
                <Image
                  alt="food image"
                  className=""
                  src={"/food2.svg"}
                  width={86}
                  height={86}
                />
                <Image
                  className=""
                  src={"/dessert.svg"}
                  alt="food image"
                  width={70}
                  height={70}
                />
                <Image
                  alt="food image"
                  className=""
                  src={"/food3.svg"}
                  width={86}
                  height={86}
                />
              </div>
              <div
                className="text-xl"
                style={{
                  fontFamily: "serif, arial",
                  color: "rgb(72, 136, 23)",
                }}
              >
                Only Good Food and Happy Moods!
              </div>
            </div>
            <Image
              className="col-span-4"
              src={"/landing.svg"}
              alt="Food picture"
              width={700}
              height={100}
              priority={true}
            />
          </div>
          <Image
            src="/grains.svg"
            alt="leaf picture"
            width={200}
            height={200}
            className="absolute top-24 right-24"
          />

          <div
            className="grid gap-4 grid-cols-2 text-3xl tracking-widest p-3"
            style={{ fontFamily: "Playfair Display SC" }}
          >
            <span className="justify-self-end">Make </span>
            <animated.div
              style={{ ...springs }}
              className="text-orange-400 justify-self-start"
            >
              {dishNames[currentDishIndex]}
            </animated.div>
          </div>
        </>
      )}
    </>
  );
}
