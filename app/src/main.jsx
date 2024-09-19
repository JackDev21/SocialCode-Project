import { store } from "./redux/store"
import { Provider } from "react-redux"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
