import Header from "./LayoutComponents/Header"
import Sidebar from "./LayoutComponents/Sidebar"
import styles from "./Layout.module.css"
import { useState } from "react"

function Layout({ children }) {
    const [isOpened, setIsOpened] = useState(false);
    return (
        <div className={styles.layout}>
            <Sidebar isOpened={isOpened} setIsOpened={setIsOpened} />
            <div className={styles.container}>
                <Header />
                <main className={styles.content}>{children}</main>
            </div>
        </div>
    )
}

export default Layout