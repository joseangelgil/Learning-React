import axios from "axios"

const TOKEN = "cu2kot1r01qh0l7hg9egcu2kot1r01qh0l7hg9f0"

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN
  }
})