import './App.css'
import { ExpenseForm } from './components/ExpenseForm';
import Home from './components/Home';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { ExpenseProvider } from './cotext/ExpenseContext';
import Expenses from './components/Expenses';


function App() {
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    errorElement: <div>Page Not Found</div>
  },
  {
   path: '/add-expense',
   element: <ExpenseForm/> 
  },
  {
    path: '/expenses',
    element: <Expenses/>
  },
  
])
  return (
    <>
      <ExpenseProvider>
        <RouterProvider router={router}/>
      </ExpenseProvider>
    </>
  )
}

export default App
