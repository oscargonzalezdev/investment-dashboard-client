import styles from "../Layout.module.css"

function Sidebar(props) {
    const { isOpened, setIsOpened } = props

    return (
        <aside className={`${styles.sidebar} ${isOpened ? styles.opened : styles.drawer}`}>
            <div className={styles.icon} onClick={() => setIsOpened(!isOpened)}>
                {isOpened ? <a href="#">Close</a> : <a href="#">Open</a>}
            </div>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
        </aside>
    )
}

export default Sidebar