import styles from "./header.module.scss";

export default function Header() {
  const navigateBacktoSelectionPage = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.menuContainer}>
        <h5 onClick={navigateBacktoSelectionPage}>Reset</h5>|
        <h5>Geek trust home</h5>
      </div>
      <div className={styles.header}>
        <h1>Finding Falcone</h1>
      </div>
    </div>
  );
}
