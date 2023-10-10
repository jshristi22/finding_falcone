import styles from "./dropdown_component.module.scss";

export interface OptionsType {
  name: string;
  value: string;
  disable?: boolean;
}
export default function DropdownComponent({
  options,
  autofocus = false,
  required = false,
  autocomplete,
  label,
  placeholder = "Select",
  onChange,
  value,
}: {
  options: OptionsType[];
  autofocus?: boolean;
  required?: boolean;
  autocomplete?: string;
  label?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  value?: string;
}) {
  return (
    <div className={styles.dropdownComponentContainer}>
      {label && <label>{label} </label>}
      <select
        className={styles.selectContainer}
        name=""
        autoFocus={autofocus}
        required={required}
        autoComplete={autocomplete}
        onChange={onChange}
        value={value}
      >
        <option value="" disabled selected hidden>
          {placeholder}
        </option>
        {options.map((option: OptionsType) => {
          return (
            <option
              className={styles.optionContainer}
              value={option.value}
              disabled={option.disable}
            >
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
