import styles from "../Layout.module.css"
import { Link } from "react-router-dom"
import {
    FcAreaChart,
    MdOutlineDashboard,
    BsBarChartLine,
    TbZoomMoney,
    BiWallet,
    HiOutlineNewspaper,
    IoLogOutOutline,
    BsFillPersonFill,
    SiBuymeacoffee,
    BsGithub
} from 'react-icons/all'
import Logo from "../../Logo/Logo"
import { Box, Link as Anchor, Divider } from "@chakra-ui/react"

function Sidebar(props) {
    const handleLogOut = () => {
        return window.location.reload()
    }
    return (
        <aside className={styles.sidebar}>
            <Box className={styles.logoResponsive}><FcAreaChart /></Box>
            <Box className={styles.logo} ><Logo size='1.5rem' /></Box>
            <nav className={styles.navbar}>
                <ul>
                    <li><Link to={"/"}><MdOutlineDashboard /><span>Overview</span></Link></li>
                    <li><Link to={"/stocks"}><TbZoomMoney /><span>Stocks</span></Link></li>
                    <li><Link to={"/investments"}><BsBarChartLine /><span>Investments</span></Link></li>
                    <li><Link to={"/wallet"}><BiWallet /><span>Wallet</span></Link></li>
                    <li><Link to={"/news"}><HiOutlineNewspaper /><span>News</span></Link></li>
                </ul>
                <ul>
                    <li><Link onClick={() => handleLogOut()}><IoLogOutOutline /><span>Logout</span></Link></li>
                    <Divider />
                    <Box className={styles.socialLinks}>
                        <Anchor href='https://github.com/oscargonzalezdev/investment-dashboard-client' isExternal><BsGithub /></Anchor>
                        <Anchor href='https://www.oscargonzalez.dev' isExternal><BsFillPersonFill /></Anchor>
                        <Anchor href='https://www.buymeacoffee.com/oscardev' isExternal><SiBuymeacoffee /></Anchor>
                    </Box>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar