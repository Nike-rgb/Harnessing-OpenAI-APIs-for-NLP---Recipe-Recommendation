import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

export default function Create(props) {
  const { recipe } = props;
  /*const recipe = `{
    "title": "Scrambled Eggs",
    "courseType": "Breakfast",
    "difficulty": "Easy",
    "time": "10 minutes",
    "calorieCount": "630",
    "ingredients": [
      "4 eggs",
      "Salt to taste",
      "Pepper to taste",
      "1 tablespoon butter",
      "2 tablespoons milk"
    ],
    "instructions": [
      "1. Crack the eggs into a bowl and whisk them until the yolks and whites are fully combined.",
      "2. Season the eggs with salt and pepper according to your taste preferences. Mix well.",
      "3. In a non-stick skillet, melt the butter over medium heat until it starts to sizzle.",
      "4. Pour the whisked eggs into the skillet and let them sit for a few seconds until they start to set around the edges.",
      "5. Use a spatula to gently push the cooked portions of the eggs towards the center, allowing the uncooked portions to flow to the edges.",
      "6. Continue this motion until the eggs are mostly cooked but still slightly runny.",
      "7. Add the milk to the eggs and stir gently to combine. This will make the eggs extra creamy.",
      "8. Cook for another minute or two, stirring occasionally, until the eggs are fully cooked but still soft and fluffy.",
      "9. Remove the skillet from the heat and let the residual heat finish cooking the eggs to perfection.",
      "10. Serve the scrambled eggs hot with toast or your favorite breakfast sides. Enjoy!"
    ]
  }`;*/
  const parsedRecipe = JSON.parse(recipe);
  return (
    <>
      <Link href={"/"}>
        <IconButton className="absolute left-4 top-4" aria-label="go back">
          <ArrowBackIcon style={{ fontSize: 30 }} />
        </IconButton>
      </Link>
      <div className="grid grid-cols-6 gap-24 p-20">
        <div className="col-span-4">
          <div className="grid gap-8 items-center">
            <span className="capitalize text-orange-400 text-md">
              {parsedRecipe.courseType}
            </span>
            <h2
              className="capitalize text-4xl"
              style={{
                fontFamily: "Playfair Display SC",
                color: "#488817",
              }}
            >
              {parsedRecipe.title}
            </h2>
            <div>
              <div
                className="text-2xl mt-16 mb-4"
                style={{
                  fontFamily: "Playfair Display SC",
                  color: "#488817",
                }}
              >
                Instructions
              </div>
              <div className="instruction_container relative h-96 overflow-auto grid gap-6 p-12 pr-32">
                {parsedRecipe.instructions.map((instruction, index) => (
                  <div key={`instruction_${index}`} className="">
                    {instruction}
                  </div>
                ))}
                <div className="sticky bottom-[-60px] bg-[#f3f3f3] w-full h-16 blur-xl"></div>
              </div>
            </div>
          </div>
        </div>

        <Image
          className="absolute left-[52%] top-[10%]"
          src="/cookpot.png"
          width={300}
          height={300}
          alt="cooking pot"
        />

        <div className="self-end col-span-2">
          <div className="rounded-3xl bg-white p-12">
            <div className="grid gap-6">
              <div className="flex gap-4 items-center">
                <i class="fa-solid fa-hourglass-end"></i>
                {parsedRecipe.time}
              </div>
              <div className="flex gap-4 items-center">
                <i class="fa-solid fa-bolt" />
                {parsedRecipe.calorieCount} calories
              </div>
              <div className="flex gap-4 items-center">
                <i class="fa-solid fa-medal rotate-180" />
                {parsedRecipe.difficulty}
              </div>
            </div>
            <div
              className="mt-12 mb-4 text-xl"
              style={{ fontFamily: "Playfair Display SC" }}
            >
              Ingredients
            </div>
            <div className="grid gap-4 p-3 h-48 overflow-auto">
              {parsedRecipe.ingredients.map((instruction, index) => (
                <div key={`instruction_${index}`}>{instruction}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    if (context.query.query.length > 400) throw new Error();
    const res = await fetch("http://localhost:3000/api/create_recipe", {
      method: "POST",
      body: context.query.query,
    });
    const result = await res.text();
    if (result === "Error") throw new Error();
    return {
      props: { recipe: result },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}
