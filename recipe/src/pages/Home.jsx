import React, { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard';
import axios from "axios"


function Home() {

  const [recipes, setRecipes] = useState([])
  const [total, setTotal] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  async function fetchRecipes(skipCount, query) {
    try {
      let url = `https://dummyjson.com/recipes?limit=6&skip=${skipCount}`;
      if (query) {
        url = `https://dummyjson.com/recipes/search?limit=6&skip=${skipCount}&q=${query}`;
      }
      const { data } = await axios.get(url)
      setRecipes((prev) => skipCount === 0 ? data.recipes : [...prev, ...data.recipes])
      setTotal(data.total)
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchRecipes(0)
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    let query = form.get("query").trim()
    setSearchQuery(query)

    if (query) {
      fetchRecipes(0, query)
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">

      <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto mb-8">
        <input name="query" type="text" placeholder="Search recipes..."
          className="flex-1 border border-border rounded px-3 py-2 bg-card text-text outline-none focus:border-accent"
        />
        <button type="submit" className="bg-accent hover:bg-accent-hover text-white rounded px-4 py-2 font-medium">
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {recipes.length < total && (
        <div className="text-center mt-8">
          <button type="button" onClick={() => fetchRecipes(recipes.length)}
            className="bg-accent hover:bg-accent-hover text-white rounded px-6 py-2 font-medium">
            Load More
          </button>
        </div>
      )}

    </main>
  )
}

export default Home