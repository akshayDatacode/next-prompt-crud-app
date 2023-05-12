"use client"
import { useState, useEffect } from "react"
import PromptCardList from "./PromptCardList"

const Feed = () => {
  const [searchText, setSearchText] = useState()
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    const res = await fetch('/api/prompt')
    const data = await res.json()
    return data
  }

  useEffect(() => {
    fetchPosts().then((res) => {
      setPosts(res)
    })
  }, [])

  const handleSearchChange = (e) => { }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search for prompts..."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input"
        />
      </form>
      {
        posts &&
        <PromptCardList
          data={posts}
          handleTagClick={() => { }}
        />
      }
    </section>
  )
}

export default Feed