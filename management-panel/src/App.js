import './App.css'
import {Restaurant_page} from './restaurant/restaurant_page'
import './restaurant/restaurant_page.css'
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className='App'>
      <Restaurant_page />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      />
    </div>
    
  )
}

export default App;
