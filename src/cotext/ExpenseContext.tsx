import { createContext, useContext, useEffect, useState } from "react";
import type { Expense } from "../types/Expense";

export interface ExpenseContextType {
    expenses: Expense[];
    addExpense: (expense: Expense) => void;
}

export const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

interface ExpenseProviderProps {
    children: React.ReactNode;
}

export const ExpenseProvider = ({ children }: ExpenseProviderProps) => { 
    const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load from localStorage
  useEffect(() => {
    const savedExpenses =
      localStorage.getItem("expenses");

    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      "expenses",
      JSON.stringify(expenses)
    );
  }, [expenses]);

  const addExpense = (expense: Expense) => {
    console.log("Adding expense:", expense);
    console.log("Current expenses before adding:", expenses);
    setExpenses((prev) => [...prev, expense]);
    console.log("Expense added. Current expenses after adding:", [...expenses, expense]);
    }

    return (
        <ExpenseContext.Provider value={{ expenses, addExpense }}>
            {children}
        </ExpenseContext.Provider>
    );
    
}

export const useExpenses = () => {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error(
      "useExpenses must be used inside ExpenseProvider"
    );
  }

  return context;
};

// export const useExpenseContext = () => {
//     const expenses = useContext(ExpenseContext);

//     if (!expenses) {
//         throw new Error("ExpenseContext is not provided");
//     }   
//     return expenses;
// }

// export const useAddExpenseContext = (expense: Expense) => {
//     console.log("useAddExpenseContext called with expense:", expense);
//     const expenses = useExpenseContext();

//     console.log("Add expense function not implemented");
//     console.log("Expense to add:", expense);

//     expenses.push(expense);
// }

// export const ExpenseContext = createContext<{
//     expenses: Expense[];
//     addExpense: (expense: Expense) => void;
// }>({
//     expenses: [],
//     addExpense: (expense) => {
//         console.log("Add expense function not implemented");
//         console.log("Expense to add:", expense);
//     }
// });