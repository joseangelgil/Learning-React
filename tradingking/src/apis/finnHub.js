import axios from "axios"

const TOKEN = "(your finnHub API key here)"

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN
  }
})
