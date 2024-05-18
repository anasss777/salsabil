import firebase from "@/firebase";

type Props = {
  postTitle: string;
  content: string;
  category: string;
  postImage?: File;
};

export const addPost = async ({
  postTitle,
  content,
  category,
  postImage,
}: Props) => {
  let newPostRef = firebase.firestore().collection("posts").doc();

  await newPostRef.set({
    postId: newPostRef.id,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    postTitle,
    content,
    category,
  });

  if (postImage) {
    // Create a reference to the file in Firebase Storage
    const storageRef = firebase.storage().ref();
    const newImageRef = storageRef.child(
      `images/${newPostRef.id}/${postImage.name}${newPostRef.id}`
    );

    // Upload the new image to Firebase Storage
    newImageRef.put(postImage).then((snapshot) => {
      console.log(`Uploaded a ${postImage.name} image!`);

      // Get the download URL of the image and update the post
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        newPostRef
          .update({
            postImage: downloadURL,
          })
          .then(() => {
            console.log("Profile updated successfully.");
          })
          .catch((error) => {
            console.error("Error updating profile: ", error);
          });
      });
    });
  }
};
