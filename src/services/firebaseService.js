import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";

// Customer-related operations
export const fetchCustomers = async () => {
  try {
    const customersSnapshot = await getDocs(collection(db, "customers"));
    return {
      totalCustomers: customersSnapshot.size,
      customers: customersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    };
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

// Transaction-related operations
export const fetchRecentTransactions = async (limit = 5) => {
  try {
    const transactionsSnapshot = await getDocs(collection(db, "transactions"));
    const transactions = transactionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Sort and limit transactions
    return transactions
      .sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate())
      .slice(0, limit);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

// You can add more Firebase-related functions here