import { app, database } from "../../firebase";
import { collection, query, getDocs , orderBy, addDoc, Timestamp, deleteDoc, doc, setDoc } from 'firebase/firestore';

const db = collection(database, "posts");

export async function getPosts() {
    const result = query(db, orderBy("time", "desc"));
    const snapshot = await getDocs(result);

    let posts = []
    snapshot.forEach((post) => {
        var id = post.id
        var content = post.data().content
        var time = post.data().time.toDate().toLocaleString("en-GB")
        var docs = {id, content, time}
        posts.push(docs)
    })
    return({posts})
}

export async function addPost(content: string) {
    const time = Timestamp.fromDate(new Date())
    const data = {
        "content": content,
        "time": time
    }
    await addDoc(db, data)
}

export async function deletePost(id: string) {
    const document = doc(database, "posts", id)
    await deleteDoc(document)
}

export async function editPost(id: string, newContent: string) {
    const document = doc(database, "posts", id)
    const time = Timestamp.fromDate(new Date())
    const data = {
        "content": newContent,
        "time": time
    }
    await setDoc(document, data)
}