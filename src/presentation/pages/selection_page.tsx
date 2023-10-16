import { useEffect, useState } from "react";
import styles from "./selection_page.module.scss";
import DropdownComponent from "../component/dropdown_component";
import axios from "axios";
import RadioComponent from "../component/custom_radio/radio_component";
import Header from "../component/header/header";
import { Link } from "react-router-dom";

interface vehicleDataType {
  name: string;
  total_no: number;
  max_distance: number;
  speed: number | null;
}
interface PlanetsDataType {
  name: string;
  distance: number;
}

interface UserSelectedData {
  destination1: {
    planet: PlanetsDataType;
    vehicle: vehicleDataType;
  };
  destination2: {
    planet: PlanetsDataType;
    vehicle: vehicleDataType;
  };
  destination3: {
    planet: PlanetsDataType;
    vehicle: vehicleDataType;
  };
  destination4: {
    planet: PlanetsDataType;
    vehicle: vehicleDataType;
  };
}

const initialState: UserSelectedData = {
  destination1: {
    planet: { name: "", distance: 0 },
    vehicle: { name: "", total_no: -1, max_distance: 0, speed: null },
  },
  destination2: {
    planet: { name: "", distance: 0 },
    vehicle: { name: "", total_no: -1, max_distance: 0, speed: null },
  },
  destination3: {
    planet: { name: "", distance: 0 },
    vehicle: { name: "", total_no: -1, max_distance: 0, speed: null },
  },
  destination4: {
    planet: { name: "", distance: 0 },
    vehicle: { name: "", total_no: -1, max_distance: 0, speed: null },
  },
};

export default function SelectionPage() {
  // api data
  const [planetOptions, setPlanetOptions] = useState<PlanetsDataType[]>([]);
  const [vehicleOptions, setVehicleOptions] = useState<vehicleDataType[]>([]);
  const [userToken, setUserToken] = useState("");

  // user data
  const [selectedData, setSelectedData] =
    useState<UserSelectedData>(initialState);

  useEffect(() => {
    getPlanetsData();
    getVehiclesData();
    getToken();
  }, []);

  useEffect(() => {
    calculateTime();
  }, []);

  const onPlanetSelected = ({
    key,
    distance,
    value,
  }: {
    key: keyof UserSelectedData;
    distance: number;
    value: string;
  }) => {
    setSelectedData({
      ...selectedData,
      [key]: {
        ...selectedData[key],
        planet: {
          name: value,
          distance: distance,
        },
      },
    });
  };

  const onVehicleSelected = (
    key: keyof UserSelectedData,
    selectedVehicle: vehicleDataType
  ) => {
    let total_no;
    // Finding for total no of vehicles left after last selection
    for (let i = 0; i < Object.keys(selectedData).length; i++) {
      const key = Object.keys(selectedData)[i];
      const vehicleFromList =
        selectedData[key as keyof UserSelectedData]?.vehicle;
      if (vehicleFromList?.name === selectedVehicle?.name) {
        total_no = vehicleFromList.total_no;
      }
    }
    // setting vehicle for user data
    setSelectedData({
      ...selectedData,
      [key]: {
        ...selectedData[key],
        vehicle: {
          ...selectedVehicle,
          // reducing vehicle's total count
          total_no: total_no ? total_no - 1 : selectedVehicle.total_no - 1,
        },      
      },
    });
  };
  const getVehicleTotalNumber = (vehicle: vehicleDataType):number|undefined =>{
    let value;
    for (let i = 0; i < Object.keys(selectedData).length; i++) {
      const key = Object.keys(selectedData)[i];
      const selectedVehicle =
        selectedData[key as keyof UserSelectedData].vehicle;
      if (selectedVehicle?.name === vehicle?.name) {        
        if(value) {
          value = selectedVehicle?.total_no < value ? selectedVehicle.total_no : value
        }
        else value = selectedVehicle?.total_no ;
      }
    }
    return value;
  }

  const isRadioBtnDisable = (
    key: keyof UserSelectedData,
    vehicle: vehicleDataType
  ): boolean => {
    // checking if vehicle has the capacity to reach Destination Planet
    if (selectedData[key].planet.distance > vehicle.max_distance) return true;

    // Checking if vehicle is available or not
    for (let i = 0; i < Object.keys(selectedData).length; i++) {
      const key = Object.keys(selectedData)[i];
      const selectedVehicle =
        selectedData[key as keyof UserSelectedData].vehicle;
      if (selectedVehicle?.name === vehicle?.name) {
        // checking if any selectedVehicle has total_no === 0
        if (selectedVehicle?.total_no === 0) return true;
      }
    }
    return false;
  };

  const isOptionDisable = (option: string): boolean => {
    for (let i = 0; i < Object.keys(selectedData).length; i++) {
      const key = Object.keys(selectedData)[i];
      if (option === selectedData[key as keyof UserSelectedData].planet.name)
        return true;
    }
    return false;
  };

  const calculateTime = () => {
    let time = 0;
    for (let i = 0; i < Object.keys(selectedData).length; i++) {
      const key = Object.keys(selectedData)[i];
      if (selectedData[key as keyof UserSelectedData].vehicle.speed) {
        time +=
          selectedData[key as keyof UserSelectedData].planet.distance /
          selectedData[key as keyof UserSelectedData].vehicle.speed!;
      }
    }
    return time;
  };

  // fetching Api data
  const getPlanetsData = async () => {
    const response = await axios.get(
      "https://findfalcone.geektrust.com/planets"
    );
    setPlanetOptions([...response.data]);
  };
  const getVehiclesData = async () => {
    const response = await axios.get(
      "https://findfalcone.geektrust.com/vehicles"
    );
    setVehicleOptions([...response.data]);
  };
  const getToken = async () => {
    const header = {
      Accept: "application/json",
    };
    const response = await axios.post(
      "https://findfalcone.geektrust.com/token",
      {},
      {
        headers: header,
      }
    );
    setUserToken(response.data.token);
  };
  const findFalcone = async () => {
    const data = {
      token: userToken,
      planet_names: Object.keys(selectedData).map((k) => {
        const key = k as keyof UserSelectedData;
        return selectedData[key].planet.name;
      }),
      vehicle_names: Object.keys(selectedData).map((k) => {
        const key = k as keyof UserSelectedData;
        return selectedData[key].vehicle.name;
      }),
    };
    const response = await axios.post(
      "https://findfalcone.geektrust.com/find",
      { ...data },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem('status', JSON.stringify(response.data.status))
    if(response.data.planet_name) {
      localStorage.setItem('planet', JSON.stringify(response.data.planet_name))
      localStorage.setItem('time', JSON.stringify(calculateTime()))
    }

  };
  

  return (
    <div className={styles.selectionPageContainer}>
      <Header />
      <div className={styles.bodyContainer}>
        <div>
          <h2 className={styles.title}>Select Planet you want to search in:</h2>
          <div className={styles.optionDetailsContainer}>
            <div className={styles.dropdownContainer}>
              {Object.keys(selectedData).map((k, idx) => {
                const key = k as keyof UserSelectedData;
                return (
                  <div className={styles.optionContainer}>
                    <DropdownComponent
                      value={selectedData[key].planet.name}
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
                          key: key,
                          distance: planetOptions.filter(
                            (opt) => opt.name === e.target.value
                          )[0].distance,
                          value: e.target.value,
                        })
                      }
                    />
                    {selectedData[key].planet.name !== "" && (
                      <div className={styles.radioContainer}>
                        {vehicleOptions.map((opt: vehicleDataType) => {
                          return (
                            <div className={styles.radioBtn}>
                              <RadioComponent
                                checked={
                                  selectedData[key]?.vehicle?.name === opt?.name
                                }                                
                                label={`${opt.name} (${getVehicleTotalNumber(opt) ?? opt.total_no})`}
                                disable={isRadioBtnDisable(key, opt)}
                                onChange={() => {
                                  onVehicleSelected(key, opt);
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <h2 className={styles.timeContainer}>
              Time taken: {calculateTime()}
            </h2>
          </div>
        </div>

        <div onClick={findFalcone} className={styles.findBtnContainer}>
          <Link to='/result'><button className={styles.findBtn}>Find Falcone!</button></Link>
        </div>
      </div>
    </div>
  );
}
