import styles from "./Button.module.css";
// A re-usable component
function Button({ children, variant, onClick }) {
  //* adding the variant choosen by user to the style --> The || operator for validation if the user entered unvalid variant that doesn't exist in the style sheet.
  const buttonClass = `${styles.btn} ${styles[variant] || ""}`.trim();
  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}

export default Button;
