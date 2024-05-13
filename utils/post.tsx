import firebase from "@/firebase";

type Props = {
  postTitle: string;
  content: string;
  category: string;
};

export const addPost = async ({ postTitle, content, category }: Props) => {
  let newPostRef = firebase.firestore().collection("posts").doc();

  await newPostRef.set({
    postId: newPostRef.id,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    postTitle,
    content,
    category,
  });
};
