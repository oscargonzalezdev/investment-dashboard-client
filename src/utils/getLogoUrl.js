import axios from 'axios'

export const getLogoUrl = (symbol) => {
    return new Promise((resolve, reject) => {
        const upperSymbol = symbol.toUpperCase()
        const lowerSymbol = symbol.toLowerCase()

        const urlWithUpperSymbol = `https://eodhistoricaldata.com/img/logos/US/${upperSymbol}.png`
        const urlWithLowerSymbol = `https://eodhistoricaldata.com/img/logos/US/${lowerSymbol}.png`
        axios.get(urlWithUpperSymbol)
            .then((response) => {
                if (response.status === 200) {
                    resolve(urlWithUpperSymbol)
                } 
            })
            .catch((error) => {
                resolve(urlWithLowerSymbol)
            });
    });
}