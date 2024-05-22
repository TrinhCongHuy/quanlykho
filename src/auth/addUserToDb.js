import { getDatabase, ref, set } from "firebase/database";
import { serverTimestamp } from '../App';


export  function addUserToDatabase(uid, email, role) {
  const db = getDatabase();
  const userRef = ref(db, `Users/${uid}`);

  set(userRef, {
      uid: uid,
      email: email,
      auth: role,
      createdAt: serverTimestamp()
  }).then(() => {
      console.log("User added to database with role:");
  }).catch((error) => {
      console.error("Error adding user to database:", error);
  });
}