import Rotas from "./routes";
import {ToastContainer} from 'react-toastify'

import './styles.css';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="app">
      <Rotas/>
      <ToastContainer autoClose={3000}/>
    </div>
  );
}

export default App;
