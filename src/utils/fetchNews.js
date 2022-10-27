import axios from "axios"

export const fetchNews = async () => {
   const response = await axios.get('https://api.nytimes.com/svc/topstories/v2/business.json?api-key=JdjDRJVla0Pkg1dPJTqO6nf43oIBNf6W')
   if (response.status === 200 && response.data.results) {
      console.count('fetching news..')
      let articles = await response.data.results.filter(news => {
         return news.item_type === 'Article'
      })
      return articles
   }
}