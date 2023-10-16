import styles from "./radio_component.module.scss";

export default function RadioComponent({
  checked,
  label,
  disable = false,
  onChange,
}: {
  checked?: boolean;
  label?: string;
  disable?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) {
  return (
    <div
      className={`${disable ? styles.disableClass : ""} ${
        styles.radioBtnComponent
      }`}
    >
      <input
        type="radio"
        checked={checked}
        disabled={disable}
        onChange={onChange}
      />
      <label>{label}</label>
    </div>
  );
}
