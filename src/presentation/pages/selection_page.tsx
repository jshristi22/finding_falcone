import { useState } from "react";
import styles from "./selection_page.module.scss";
import DropdownComponent from "../component/dropdown_component";

interface DestinationPlanetValuesType {
  destinationOne: string;
  destinationTwo: string;
  destinationThree: string;
  destinationFour: string;
}

const initialDestinationPlanetValues: DestinationPlanetValuesType = {
  destinationOne: "",
  destinationTwo: "",
  destinationThree: "",
  destinationFour: "",
};

export default function SelectionPage() {
  const [destinationPlanet, selectedDestinationPlanet] =
    useState<DestinationPlanetValuesType>(initialDestinationPlanetValues);

  // tobe updated with API data
  const [planetOptions, setPlanetOptions] = useState<string[]>([
    "one",
    "teo",
    "three",
    "four",
  ]);

  const onPlanetSelected = ({
    name,
    value,
  }: {
    name: keyof DestinationPlanetValuesType;
    value: string;
  }) => {
    //updating local state
    const planets = { ...destinationPlanet, [name]: value };
    selectedDestinationPlanet(planets);
  };

  const isOptionDisable = (option: string): boolean => {
    for (let i = 0; i < Object.keys(destinationPlanet).length; i++) {
      const key = Object.keys(destinationPlanet)[i];
      if (
        option === destinationPlanet[key as keyof DestinationPlanetValuesType]
      )
        return true;
    }
    return false;
  };

  return (
    <div className={styles.selectionPageContainer}>
      <div className={styles.menuContainer}>
        <h5>Reset</h5>|<h5>Geek trust home</h5>
      </div>
      <div className={styles.header}>
        <h1>Finding Falcone</h1>
      </div>
      <div className={styles.bodyContainer}>
        <div>
          <h2 className={styles.title}>Select Planet you want to search in:</h2>
          <div className={styles.optionDetailsContainer}>
            <div className={styles.dropdownContainer}>
              <DropdownComponent
                value={destinationPlanet.destinationOne}
                options={planetOptions.map((opt) => ({
                  name: opt,
                  value: opt,
                  disable: isOptionDisable(opt),
                }))}
                autofocus
                label="Destination 1"
                required
                onChange={(e) =>
                  onPlanetSelected({
                    name: "destinationOne",
                    value: e.target.value,
                  })
                }
              />
              <DropdownComponent
                value={destinationPlanet.destinationTwo}
                options={planetOptions.map((opt) => ({
                  name: opt,
                  value: opt,
                  disable: isOptionDisable(opt),
                }))}
                label="Destination 2"
                required
                onChange={(e) =>
                  onPlanetSelected({
                    name: "destinationTwo",
                    value: e.target.value,
                  })
                }
              />
              <DropdownComponent
                value={destinationPlanet.destinationThree}
                options={planetOptions.map((opt) => ({
                  name: opt,
                  value: opt,
                  disable: isOptionDisable(opt),
                }))}
                label="Destination 3"
                required
                onChange={(e) =>
                  onPlanetSelected({
                    name: "destinationThree",
                    value: e.target.value,
                  })
                }
              />
              <DropdownComponent
                value={destinationPlanet.destinationFour}
                options={planetOptions.map((opt) => ({
                  name: opt,
                  value: opt,
                  disable: isOptionDisable(opt),
                }))}
                label="Destination 4"
                required
                onChange={(e) =>
                  onPlanetSelected({
                    name: "destinationFour",
                    value: e.target.value,
                  })
                }
              />
            </div>
            <h2>Time taken: 0</h2>
          </div>
        </div>
        {/* radio button */}

        <div className={styles.findBtnContainer}>
          <button className={styles.findBtn}>Find Falcone!</button>
        </div>
      </div>
    </div>
  );
}
