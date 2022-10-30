import { useContext } from 'react'
import { Box, Grid, GridItem, Heading } from '@chakra-ui/react'
import styles from './News.module.css'
import { DataContext } from '../../context/data.context'
import SkewLoader from "react-spinners/SkewLoader"

function BreakingNews({ w, h }) {
    const { news } = useContext(DataContext)
    return (
        <>
            {
                !news.length > 0
                    ? <SkewLoader
                        color="#3F51B5"
                        cssOverride={{ margin: 'auto' }}
                        loading
                        size={30}
                        speedMultiplier={1}
                    />
                    : <Box className='box' w={w ? w : 'fit-content'}>
                        <Heading className='section-title'>Breaking News</Heading>
                        <Box className={styles.containerLatestNews}>
                            <Grid
                                className={styles.boxGrid}
                                templateRows='repeat(6, 1fr)'
                                templateColumns='repeat(1, 1fr)'
                                h={h ? h : 'fit-content'}
                                gap='10px'
                            >
                                {
                                    news.slice(0, 15).map((news, index) => {
                                        return (
                                            <GridItem key={index} colSpan={1} bg={news.multimedia === null ? 'rgba(0, 0, 0, 0.15)' : `url(${news.multimedia[0].url})`} bgRepeat="no-repeat" bgSize='cover' bgPosition='center' borderRadius={8}>
                                                <a href={news.short_url} target="_blank" rel="noopener noreferrer" style={{ width: '100%' }}>
                                                    <Box h='150px' backgroundColor='rgba(0, 0, 0, 0.7)' display='flex' alignItems='center' textAlign='left' p='20px' borderRadius={8} >
                                                        <Heading as='h3' color='#fff' >{news.title}</Heading>
                                                    </Box>
                                                </a>
                                            </GridItem>
                                        )
                                    })
                                }
                            </Grid>
                        </Box>
                    </Box>
            }
        </>
    )
}

export default BreakingNews