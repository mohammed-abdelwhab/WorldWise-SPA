import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright WorldWise {new Date().getFullYear()} By Mohamed
        Abdelwhab.
      </p>
    </footer>
  );
}

export default Footer;
