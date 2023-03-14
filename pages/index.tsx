import { getPosts, addPost } from "./api/posts"
import { useState } from "react"
import { useRouter } from "next/router"
import Post from "@/components/Post"

export async function getServerSideProps() {
  const posts = await getPosts()

  if (!posts) {
    return {
      notFound: true,
    }
  }
  return {
    props: posts,
  }
}

export default function Home({posts}) {
  const [textArea, setTextArea] = useState("")
  const router = useRouter()

  const handleAddPost = () => {
    if (textArea !== "") {
      addPost(textArea).then(() => {setTextArea("")}).then(() => router.reload())
    }
  }

  return (
    <div className="bg-gray-800 flex flex-col items-center py-36 min-h-screen ml-[18vw] text-white">
      <div className="flex flex-col gap-8 w-3/4">
        <div className="bg-gray-600 flex flex-col rounded-xl p-8 gap-4">
          <textarea className="bg-gray-700 rounded-xl p-4" onChange={event => setTextArea(event.target.value)} rows={8}></textarea>
          <div className="bg-purple-600 hover:bg-purple-500 w-fit px-4 py-1 rounded-full self-end cursor-pointer font-bold" onClick={handleAddPost}>Post</div>
        </div>
        {posts.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </div>
  )
}
