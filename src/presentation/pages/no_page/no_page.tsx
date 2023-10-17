
import styles from './no_page.module.scss'

function NoPage() {
  return (
    <div className={styles.noPageContainer}>
      <h1>Page not found</h1>
      <a href='/'>Go back to home</a>
    </div>
  )
}

export default NoPage
