import { db } from "./firebase"; // Firebase config import
import { doc, getDoc } from "firebase/firestore"; // Firestore functions

export async function authenticate(username: string, password: string): Promise<boolean> {
  try {
    // Firestore e `users` collection er moddhe username er document khujbo
    const userRef = doc(db, "users", username); 
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.log("User not found!");
      return false;
    }

    // User er stored data pabo
    const userData = userSnap.data();
    
    // Password match korano
    if (userData.password === password) {
      console.log("Login successful!");
      return true;
    } else {
      console.log("Incorrect password!");
      return false;
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return false;
  }
}
