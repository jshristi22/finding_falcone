import styles from "./App.module.scss";
import Footer from "./presentation/component/footer/footer";
import Header from "./presentation/component/header/header";
import NoPage from "./presentation/pages/no_page/no_page";
import ResultPage from "./presentation/pages/result_page";
import SelectionPage from "./presentation/pages/selection_page";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className={styles.appContainer}>
      <Header />
      <div className={styles.content}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SelectionPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="*" element={<NoPage />} />        
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
