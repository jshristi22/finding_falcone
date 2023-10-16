import {useNavigate } from "react-router-dom";
import Header from "../component/header/header";
import styles from "./result_page.module.scss";
export default function ResultPage() {
  const navigate = useNavigate();
  const navigateBacktoSelectionPage = () => {
    localStorage.clear();
    navigate("/");
  };

  const status = localStorage.getItem("status")
    ? JSON.parse(localStorage.getItem("status")!)
    : undefined;
  const planet = localStorage.getItem("planet")
    ? JSON.parse(localStorage.getItem("planet")!)
    : undefined;
  const time = localStorage.getItem("time")
    ? JSON.parse(localStorage.getItem("time")!)
    : undefined;

  return (
    <div className={styles.resultPageContainer}>
      <Header />
      <div className={styles.bodyContainer}>
        <h2>
          {status === "success"
            ? `Success! Congratulations on Finding Falcone. King Shah is mighty
          pleased.`
            : `Failure! You lost on Finding Falcone. King Shah is very enraged.`}
        </h2>
        <div>
          {time && <h3>Time taken: {time}</h3>}
          {planet && <h3>Planet found: {planet}</h3>}
        </div>
        <div
          onClick={navigateBacktoSelectionPage}
          className={styles.findBtnContainer}
        >
          <button
            onClick={navigateBacktoSelectionPage}
            className={styles.findBtn}
          >
            Start Again
          </button>
        </div>
      </div>
    </div>
  );
}
