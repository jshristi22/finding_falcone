import styles from "./App.module.scss";
import ResultPage from "./presentation/pages/result_page";
import SelectionPage from "./presentation/pages/selection_page";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className={styles.appContainer}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SelectionPage />} />
          <Route path="/result" element={<ResultPage />} />
          {/* <Route path="*" element={<NoPage />} />         */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
