import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../firebaseConfig";
import { Message } from "../../types";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const sendMessage = async (
  text: string,
  email: string
): Promise<void> => {
  if (!text.trim()) return; // no mensajes vacios

  try {
    await addDoc(collection(db, "messages"), {
      text,
      user: { email }, // mail guardado dentro de user
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error adding message: ", error);
    throw error;
  }
};

export const subscribeToMessages = (
  callback: (messages: Message[]) => void
) => {
  const messagesQuery = query(
    collection(db, "messages"),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(messagesQuery, (snapshot) => {
    const messages = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate().toISOString()
            : null,
      } as Message;
    });

    callback(messages);
  });
};
