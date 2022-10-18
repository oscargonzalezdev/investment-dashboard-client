import styles from "../Layout.module.css"
import { Link } from "react-router-dom"
// import { GrMoney } from 'react-icons/all'
import {
    FcAreaChart,
    MdOutlineDashboard,
    BsBarChartLine,
    TbZoomMoney,
    BiWallet,
    HiOutlineNewspaper,
    IoSettingsOutline,
    IoLogOutOutline
} from 'react-icons/all'

function Sidebar(props) {
    Link
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}><FcAreaChart /><span>INVESTAPP</span></div>
            <nav className={styles.navbar}>
                <ul>
                    <li><Link to={"/overview"}><MdOutlineDashboard /><span>Overview</span></Link></li>
                    <li><Link to={"/investments"}><BsBarChartLine /><span>Investments</span></Link></li>
                    <li><Link to={"/stocks"}><TbZoomMoney /><span>Stocks</span></Link></li>
                    <li><Link to={"/wallet"}><BiWallet /><span>Wallet</span></Link></li>
                    <li><Link to={"/news"}><HiOutlineNewspaper /><span>News</span></Link></li>
                </ul>
                <ul>
                    <li><Link to={"/settings"}><IoSettingsOutline /><span>Settings</span></Link></li>
                    <li><Link to={"/logout"}><IoLogOutOutline /><span>Logout</span></Link></li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar