import { useEffect, useState } from "react";
import styles from "./selection_page.module.scss";
import DropdownComponent from "../component/dropdown_component";
import axios from "axios";

interface GetPlanetsDataType {
  name: string;
  distance: number;
}
interface DestinationPlanetValuesType {
  destinationOne: GetPlanetsDataType;
  destinationTwo: GetPlanetsDataType;
  destinationThree: GetPlanetsDataType;
  destinationFour: GetPlanetsDataType;
}

const initialDestinationPlanetValues: DestinationPlanetValuesType = {
  destinationOne: { name: "", distance: 0 },
  destinationTwo: { name: "", distance: 0 },
  destinationThree: { name: "", distance: 0 },
  destinationFour: { name: "", distance: 0 },
};

export default function SelectionPage() {
  const [destinationPlanet, selectedDestinationPlanet] =
    useState<DestinationPlanetValuesType>(initialDestinationPlanetValues);

  // tobe updated with API data
  const [planetOptions, setPlanetOptions] = useState<GetPlanetsDataType[]>([]);

  useEffect(() => {
    getPlanetsData();
  });

  const onPlanetSelected = ({
    name,
    distance,
    value,
  }: {
    name: keyof DestinationPlanetValuesType;
    distance: number;
    value: string;
  }) => {
    //updating local state
    const planets: DestinationPlanetValuesType = {
      ...destinationPlanet,
      [name]: { name: value, distance: distance },
    };
    selectedDestinationPlanet(planets);
  };

  const isOptionDisable = (option: string): boolean => {
    for (let i = 0; i < Object.keys(destinationPlanet).length; i++) {
      const key = Object.keys(destinationPlanet)[i];
      if (
        option ===
        destinationPlanet[key as keyof DestinationPlanetValuesType].name
      )
        return true;
    }
    return false;
  };

  const getPlanetsData = async () => {
    const response = await axios.get(
      "https://findfalcone.geektrust.com/planets"
    );
    setPlanetOptions([...response.data]);
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
              {Object.keys(destinationPlanet).map((k, idx) => {
                const key = k as keyof DestinationPlanetValuesType;
                return (
                  <>
                    <DropdownComponent
                      value={destinationPlanet[key].name}
                      options={planetOptions.map((opt) => ({
                        name: opt.name,
                        value: opt.name,
                        disable: isOptionDisable(opt.name),
                      }))}
                      autofocus
                      label={`Destination ${idx + 1}`}
                      required
                      onChange={(e) =>
                        onPlanetSelected({
                          name: key,
                          distance: destinationPlanet[key].distance,
                          value: e.target.value,
                        })
                      }
                    />
                  </>
                );
              })}
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
