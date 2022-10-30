import { Grid, GridItem, Box, Heading, Image, Input, Button, FormLabel, InputGroup, InputLeftElement, Text, Link as Anchor } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { DataContext } from "../../context/data.context"
import Logo from "../Logo/Logo"
import styles from './Welcomme.module.css'
import {
    BsFillPersonFill,
    SiBuymeacoffee,
    BsGithub
} from 'react-icons/all'
import { useNavigate } from 'react-router-dom'

export const Welcomme = () => {
    const navigate = useNavigate()
    const { wallet, setWallet, setUser, setBalance } = useContext(DataContext)
    const [name, setName] = useState('')
    const [initialDeposit, setInitialDeposit] = useState(6000)
    const [validationMessage, setValidationMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        validateName(name)
        navigate('/overview')
    }

    const validateName = (name) => {
        if (name.length > 2 && name.match(/^[a-zA-Z]/)) {
            setWallet({ ...wallet, deposit: initialDeposit })
            setUser({ userName: name })
            setBalance(initialDeposit)
        } else {
            setValidationMessage('Name field should contain at least 3 characteres')
        }
    }

    return (
        <Box className={styles.bg} >
            <Grid className={styles.mainGrid}>
                <GridItem className={styles.leftGrid} colSpan={4} p='6%'>
                    <Box w='100%' display='flex' justifyContent='space-between' alignItems='center'>
                        <Logo size='2rem' />
                        <Box w='fit-content' className={styles.socialLinks}>
                            <Anchor href='https://github.com/oscargonzalezdev/investment-dashboard-client' isExternal><BsGithub /></Anchor>
                            <Anchor href='https://www.oscargonzalez.dev' isExternal><BsFillPersonFill /></Anchor>
                            <Anchor href='https://www.buymeacoffee.com/oscardev' isExternal><SiBuymeacoffee /></Anchor>
                        </Box>
                    </Box>
                    <Box h='80%' display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='40px'>
                        <Box textAlign='center'>
                            <Heading display='inline' fontWeight='500'>
                                {`Get started now and`}<br />
                                {`take control of your finances! `}
                            </Heading>
                            <Text fontSize='1rem' display='inline'>*</Text>
                        </Box>
                        <form className={`${styles.welcommeForm} box`} onSubmit={(e) => handleSubmit(e)}>
                            <FormLabel w='100%'>Name:
                                <Input name="name" isRequired onChange={(e) => setName(e.currentTarget.value)} value={name} type='text' placeholder='Your Name' />
                                <span style={{ color: "red" }}>{validationMessage}</span>
                            </FormLabel>
                            <FormLabel w='100%'>Deposit:
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        color='gray.300'
                                        fontSize='1.2em'
                                        children='€'
                                    />
                                    <Input name='deposit' isRequired onChange={(e) => setInitialDeposit(e.currentTarget.value)} value={initialDeposit} type='number' max={1000000} min={100}>
                                    </Input>
                                </InputGroup>
                            </FormLabel>
                            <Button
                                variant='solid'
                                colorScheme='brand'
                                type='submit'
                                w='100%'
                            >
                                Start
                            </Button>
                        </form>
                    </Box>
                    <Text fontSize='0.9rem'>
                        {`* This web application is a demo project. By using this app you are not dealing with real stock market values. Feel free to use it safely and have fun :)`}
                    </Text>
                </GridItem>
                <GridItem className={styles.rightGrid} colSpan={6} display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='40px' >
                    <Box w='80%' display='flex' justifyContent='center' borderBottom='1.5px solid #ccc'>
                        <Image w='500px' marginBottom='-1.5px' src="/images/dashboard-color-secondary.svg" />
                    </Box>
                    <Text className={styles.welcommeInfo}>
                        {`Everything you need to efficiently manage your investments in one place.`}
                    </Text>
                </GridItem>
            </Grid>
        </Box>
    )
}