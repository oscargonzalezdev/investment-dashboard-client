import Header from "./LayoutComponents/Header"
import Sidebar from "./LayoutComponents/Sidebar"
import styles from "./Layout.module.css"

function Layout({ children }) {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.container}>
                <Header />
                <main className={styles.content}>{children}</main>
            </div>
        </div>
    )
}

export default Layout