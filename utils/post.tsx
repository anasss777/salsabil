import firebase from "@/firebase";
import { Comment } from "@/types/comment";
import { Post } from "@/types/post";

type Props = {
  postTitle: string;
  content: string;
  category: string;
  postImage?: File;
};

type EditProps = {
  postId: string;
  postTitle: string;
  content: string;
  category: string;
  postImage?: File;
  oldPostImage?: string;
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
      `images/${postImage.name}${newPostRef.id}`
    );

    // Upload the new image to Firebase Storage
    newImageRef.put(postImage).then((snapshot) => {
      console.log(`Uploaded a ${postImage.name} image!`);

      // Get the download URL of the image and update the post in Firestore
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

export const deletePost = (post: Post) => {
  const postRef = firebase.firestore().collection("posts").doc(post.postId);

  postRef
    .get()
    .then(async (doc: firebase.firestore.DocumentSnapshot) => {
      if (doc.exists) {
        const commentsIds = doc
          ?.data()
          ?.comments?.map((comment: Comment) => comment.id);
        const commentsRefs = commentsIds?.map((commentId: string) =>
          firebase.firestore().doc(`comments/${commentId}`)
        );

        // Delete each comment
        if (commentsRefs) {
          commentsRefs.forEach(
            (commentRef: firebase.firestore.DocumentReference) => {
              commentRef
                .delete()
                .then(() => {
                  console.log("Comment deleted successfully.");
                })
                .catch((error: any) => {
                  console.error("Error deleting comment: ", error);
                });
            }
          );
        }

        // Delete post's image from Firebase Storage
        firebase
          .storage()
          .refFromURL(post.postImage)
          .delete()
          .then(() => {
            console.log(
              "Post's image deleted successfully from Firebase Storage!"
            );
          })
          .catch((error: any) => {
            console.log("Error deleting image from Firebase Storage: ", error);
          });

        // Delete post
        postRef
          .delete()
          .then(() => {
            console.log("Post deleted successfully.");
          })
          .catch((error: any) => {
            console.error("Error deleting post: ", error);
          });
      } else {
        console.log("No such document!");
      }
    })
    .catch((error: any) => {
      console.log("Error getting document:", error);
    });
};

export const EditPost = async ({
  postId,
  postTitle,
  content,
  category,
  postImage,
  oldPostImage,
}: EditProps) => {
  const postRef = firebase.firestore().collection("posts").doc(postId);

  // Fetch the current data of the post
  const doc = await postRef.get();
  if (!doc.exists) {
    console.log("Post does not exist!");
    return;
  }

  if (postImage) {
    // Create a reference to the file in Firebase Storage
    const storageRef = firebase.storage().ref();
    const newImageRef = storageRef.child(
      `images/${postImage.name}${postRef.id}`
    );

    // Upload the new image to Firebase Storage
    newImageRef.put(postImage).then((snapshot) => {
      console.log(`Uploaded a ${postImage.name} image!`);

      // Delete post's old image from Firebase Storage
      if (oldPostImage) {
        firebase
          .storage()
          .refFromURL(oldPostImage)
          .delete()
          .then(() => {
            console.log(
              "Post's old image deleted successfully from Firebase Storage!"
            );
          })
          .catch((error: any) => {
            console.log(
              "Error deleting old image from Firebase Storage: ",
              error
            );
          });
      }

      // Get the download URL of the image and update the post in Firestore
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        postRef
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

  // update data
  postRef
    .update({
      postTitle,
      content,
      category,
    })
    .then(() => {
      console.log("Post updated successfully.");
    })
    .catch((error) => {
      console.error("Error updating post: ", error);
    });
};
