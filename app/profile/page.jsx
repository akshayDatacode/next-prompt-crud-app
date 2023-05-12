"use client"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@components/Profile"

const MyProfile = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState()

  const fetchPosts = async () => {
    const res = await fetch(`/api/users/${session?.user.id}/posts`)
    const data = await res.json()
    return data
  }

  useEffect(() => {
    if (session?.user?.id) {
      fetchPosts().then((res) => {
        setPosts(res)
      })
    }
  }, [])


  const handleEdit = (post) => {
    router.push(`/update-promt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        })

        const filteredPost = posts.filter((p) => p._id !== post._id.toString())

        setPosts(filteredPost)

      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <div>
        <Profile
          name="My"
          desc="Welcome to your personalized page"
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </>
  )
}

export default MyProfile