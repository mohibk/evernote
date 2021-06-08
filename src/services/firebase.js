import { firebase } from "../lib/firebase";

export async function getAllNotes() {
  const result = await firebase
    .firestore()
    .collection("notes")
    .onSnapshot((serverUpdate) => {
      const notes = serverUpdate.docs.map((item) => ({
        ...item.data(),
        docId: item.id,
      }));
      console.log(notes);
    });

  //   const result = await firebase
  //     .firestore()
  //     .collection("notes")
  //     .onSnapshot((doc) => {
  //       console.log("current", doc.data());
  //     });

  //   console.log("result", result);

  //   return result.docs.map((item) => ({
  //     ...item.data(),
  //     docId: item.id,
  //   }));
}
