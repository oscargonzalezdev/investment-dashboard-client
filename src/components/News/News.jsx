import { useContext } from 'react'
import { Box, Grid, GridItem, Heading } from '@chakra-ui/react'
import styles from './News.module.css'
import { DataContext } from '../../context/data.context'
import BreakingNews from './BreakingNews'

function News() {
    const { news } = useContext(DataContext)
    return (
        <>
            {
                !news.length > 0
                    ? <p>Loading...</p>
                    : (
                        <Box className={styles.containerNews}>
                            <Box bgColor='var(--color-bg-box-light)' padding={30} borderRadius={8} shadow='1px 1px 2px #ccc'>
                                <Heading textAlign='left' marginBottom={30}>Top News</Heading>
                                <Grid
                                    className={styles.boxGrid}
                                    templateRows='repeat(2, 1fr)'
                                    templateColumns='repeat(2, 1fr)'
                                    h='700px'
                                    gap='10px'
                                >
                                    {
                                        news.slice(0, 3).map((news, index) => {
                                            return (
                                                <GridItem className='styles.gridTopNews' key={index} borderRadius={8} colSpan={index === 0 ? 2 : 1} bg={news.multimedia === null ? 'rgba(0, 0, 0, 0.15)' : `url(${news.multimedia[0].url})`} bgRepeat="no-repeat" bgSize='cover' bgPosition='center' display='flex' alignItems='end' textAlign='left'>
                                                    <a href={news.short_url} target="_blank" rel="noopener noreferrer" style={{ width: '100%' }}>
                                                        <Box borderRadius='0 0 8px 8px' backgroundColor='rgba(0, 0, 0, 0.70)' p='20px'>
                                                            <Heading as='h3' color='#fff'>{news.title}</Heading>
                                                        </Box>
                                                    </a>
                                                </GridItem>
                                            )
                                        })
                                    }
                                </Grid>
                            </Box>
                            <BreakingNews h='700px' w='300px' />
                        </Box>
                    )
            }
        </>
    )
}

export default News