import styles from "./page.module.css";

export default function AccountPage() {
  return (
    <div className={styles.page}>
      <section className={styles.section}>
        <div className={styles.card}>
          <h1 className={styles.title}>Login</h1>

          <form className={styles.form}>
            <label className={styles.field}>
              <span className={styles.label}>Email</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                className={styles.input}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Password</span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                className={styles.input}
              />
            </label>

            <button type="button" className={styles.helperLink}>
              Forgot your password?
            </button>

            <button type="submit" className={styles.submitButton}>
              Sign in
            </button>

            <button type="button" className={styles.secondaryLink}>
              Create account
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
