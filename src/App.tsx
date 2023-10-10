import styles from "./App.module.scss";
import SelectionPage from "./presentation/pages/selection_page";

function App() {
  return (
    <div className={styles.appContainer}>
      <SelectionPage />
    </div>
  );
}

export default App;
