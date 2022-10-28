import Header from "./LayoutComponents/Header"
import Sidebar from "./LayoutComponents/Sidebar"
import styles from "./Layout.module.css"
import { FaRegHeart } from "react-icons/all"
import { Flex } from "@chakra-ui/react"

function Layout({ children }) {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.container}>
                <Header />
                <main className={styles.content}>
                    {children}
                    <span className={styles.footer}>
                        <Flex alignItems='center' gap='5px'>
                            Made with <FaRegHeart display='flex' /> by <a href="https://oscargonzalez.dev" target="_blank" rel="noopener noreferrer">Oscar Gonzalez</a>
                        </Flex>
                    </span>
                </main>
            </div>
        </div>
    )
}

export default Layout