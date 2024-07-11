import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * The objective of these Static Web app project is to give idea on how to work with Routing to navigate multiple pages, How to use and create contextHook, to manage Global State, and to manage lots of functionality.
 */

export const GlobalContext = createContext(null);

// The Global States Function
export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoriteList, setFavoriteList] = useState([]);

  /**to navigate back to homepage whenever we call the api */
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault(e);
    setLoading(true);
    try {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();
      console.log(data);
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSearchParam("");
    }
  }

  function handleAddToFavorite(getCurrentItem) {
    console.log(getCurrentItem);
    let copyFavoriteList = [...favoriteList];
    const index = copyFavoriteList.findIndex(
      (item) => item.id === getCurrentItem.id
    );
    if (index === -1) {
      copyFavoriteList.push(getCurrentItem);
    } else {
      copyFavoriteList.splice(index);
    }
    setFavoriteList(copyFavoriteList);
  }

  console.log(favoriteList, "favoriteList");
  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoriteList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
