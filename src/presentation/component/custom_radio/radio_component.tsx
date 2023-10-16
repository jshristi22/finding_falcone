import styles from "./radio_component.module.scss";

export default function RadioComponent({
  id,
  checked,
  label,
  disable = false,
  onChange,
}: {
  id: string;
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
      id={id}
        type="radio"
        checked={checked}
        disabled={disable}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
