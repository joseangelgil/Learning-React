import { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext()

export const WatchListContextProvider = ({ children }) => {
  
  const [watchList, setWatchList] = useState(JSON.parse(localStorage.getItem("watchList")) || ["GOOGL", "MSFT", "AMZN"])

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList))
  }, [watchList])

  const addStock = (stock) => {
    if(watchList.indexOf(stock) === -1) {      
      setWatchList([...watchList, stock])
    }
  }

  const deleteStock = (stock) => {
    setWatchList(watchList.filter((el) => el !== stock))
  }

  return <WatchListContext.Provider value={{watchList, addStock, deleteStock}}>
    { children }
  </WatchListContext.Provider>
} 

