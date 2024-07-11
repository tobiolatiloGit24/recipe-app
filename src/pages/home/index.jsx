import React, { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-list";

export default function Home() {
  const { recipeList, loading } = useContext(GlobalContext);
  if (loading) {
    return <div>Loading... Please wait</div>;
  }
  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10 ">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item) => <RecipeItem key={item.id} item={item} />)
      ) : (
        <div>
          <p className="lg:text-4xl text-center text-black font-extrabold">
            No recipe found. Please search recipe
          </p>
        </div>
      )}
    </div>
  );
}
