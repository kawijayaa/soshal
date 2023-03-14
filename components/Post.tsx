import { deletePost, editPost } from "@/pages/api/posts"
import { useState } from "react"
import { useRouter } from "next/router"
import { FaTrash, FaEdit } from "react-icons/fa"

export default function Post({post}) {
    const [editArea, setEditArea] = useState("")
    const [isEditing, setEditing] = useState(false)
    const router = useRouter()

    const handleDeletePost = (id: string) => {
        deletePost(id).then(() => router.reload())
    }
    const handleEditPost = (id: string, newContent: string) => {
        editPost(id, newContent).then(() => router.reload())
    }

    return (
        <div className="bg-gray-600 rounded-xl p-8 flex flex-col gap-2">
            <h1 className={`${isEditing ? "hidden" : "block"} font-medium text-xl`}>{post.content}</h1>
            <div className={`flex flex-col gap-4 ${isEditing ? "block" : "hidden"}`} >
                <textarea className="bg-gray-700 rounded-xl p-4" placeholder={post.content} onChange={event => setEditArea(event.target.value)} rows={4}></textarea>
                <div className="flex items-center gap-4 self-end">
                <div className="flex gap-2">
                    <FaEdit onClick={() => setEditing(!isEditing)} className="cursor-pointer hover:text-purple-400"/>
                    <FaTrash onClick={() => handleDeletePost(post.id)} className="cursor-pointer hover:text-red-500"/>
                </div>
                <div className="bg-purple-600 hover:bg-purple-500 w-fit px-4 py-1 rounded-full cursor-pointer font-bold" onClick={() => handleEditPost(post.id, editArea)}>Edit</div>
                </div>
            </div>
            <div className={`${isEditing ? "hidden" : "flex"} justify-between items-center`}>
                <div>
                <p className="text-xs text-gray-800">{post.time.slice(0,-3)}</p>
                </div>
                <div className="flex gap-2">
                <FaEdit onClick={() => setEditing(!isEditing)} className="cursor-pointer hover:text-purple-400"/>
                <FaTrash onClick={() => handleDeletePost(post.id)} className="cursor-pointer hover:text-red-500"/>
                </div>
            </div>
        </div>
    )
}