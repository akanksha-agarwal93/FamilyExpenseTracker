import { createContext, useContext, useEffect, useState } from "react";
import type { Expense } from "../types/Expense";

export interface ExpenseContextType {
    expenses: Expense[];
    addExpense: (expense: Expense) => void;
    editExpense: (updatedExpense: Expense) => void;
    deleteExpense: (id: string) => void;
}

export const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

interface ExpenseProviderProps {
    children: React.ReactNode;
}

export const ExpenseProvider = ({ children }: ExpenseProviderProps) => { 
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    try {
          const saved = localStorage.getItem("expenses");
          setInitialized(true);
          if (saved) setExpenses(JSON.parse(saved));
        } catch (error) {
          console.error("Failed to load expenses from localStorage:", error);
          setInitialized(true); // Even if loading fails, we consider initialization complete
        }
  }, []);

  useEffect(() => {
    if (initialized) localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses, initialized]);

  const addExpense = (expense: Expense) => {
    console.log("Adding expense:", expense);
    console.log("Current expenses before adding:", expenses);
    setExpenses((prev) => [...prev, expense]);
    console.log("Expense added. Current expenses after adding:", [...expenses, expense]);
  }
  
  const editExpense = (updatedExpense: Expense) => {
    const expenseId = updatedExpense.id;
    setExpenses((prev) =>
      prev.map((expense) => (expense.id === expenseId ? updatedExpense : expense))
    );
  }

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }

    return (
        <ExpenseContext.Provider value={{ expenses, addExpense, editExpense, deleteExpense }}>
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