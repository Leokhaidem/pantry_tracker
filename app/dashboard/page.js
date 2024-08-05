"use client";
import { useState, useEffect } from "react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "@/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import DisplayPantries from "../components/DisplayPantries";

const PANTRY_COLLECTION = 'items';

function Dashboard() {
  const router = useRouter();

  const handleSignout = () => {
    signOut(auth).then(() => {
      router.push('/');
    }).catch((error) => {
      console.error("Sign out error:", error);
    });
  };

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchPantryItems(currentUser.uid); // Fetch items when user logs in
      } else {
        console.log("User is not logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddItem = async (itemName, quantity) => {
    if (user) {
      try {
        const docRef = await addDoc(collection(db, PANTRY_COLLECTION), {
          name: itemName,
          quantity: quantity,
          userId: user.uid,
        });
        console.log("Document written with ID: ", docRef.id);
        fetchPantryItems(user.uid); // Fetch items after adding
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const fetchPantryItems = async (userId) => {
    try {
      const q = query(collection(db, PANTRY_COLLECTION), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const fetchedItems = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const item = {
          id: doc.id,
          name: data.name, 
          quantity: data.quantity,
          userId: data.userId,
        };
        fetchedItems.push(item);
      });

      setItems(fetchedItems);
    } catch (e) {
      console.error('Error fetching pantry items: ', e);
    }
  };

  if (!user) {
    return <div>Please log in to add items.</div>;
  }

  return (
    <div className="h-screen">
      <div className="my-8 text-right mr-5 md:max-w-7xl">
        <Button variant="outlined" color="error" onClick={handleSignout}>Sign out</Button>
      </div>
      <div className="border rounded-lg flex flex-col justify-center items-center space-y-4">
        <div className="flex flex-col space-y-3">
          <input
            onChange={(e) => setItemName(e.target.value)}
            value={itemName}
            type="text"
            placeholder="Item name"
            className="p-2 border rounded-md"
          />
          <input
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
            type="number"
            placeholder="Quantity"
            className="p-2 border rounded-md"
          />
          <button
            className="bg-blue-500 p-2 rounded-md my-3 text-white"
            onClick={() => handleAddItem(itemName, quantity)}
          >
            Add Item
          </button>
        </div>
        <DisplayPantries items={items} fetchPantryItems={fetchPantryItems} />
      </div>
    </div>
  );
}

export default Dashboard;
