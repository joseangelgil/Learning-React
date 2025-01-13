import { useState } from 'react'
import { useGlobalContext } from '../context'

const Search = () => {

  const { setSearchTerm, fetchRandomMeal } = useGlobalContext()
  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()    
    if(text) {
      setSearchTerm(text)
      // setText('') this is optional in case we want to clean up the search bar after we search for a meal.
    }
  }

  const handleRandomMeal = () => {
    setSearchTerm('')
    setText('')
    fetchRandomMeal()
  }

  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input className='form-input' type='text' placeholder='type favorite meal' onChange={handleChange} value={text}/>
        <button className='btn' type='submit'>search</button>
        <button className='btn btn-hipster' type='button' onClick={handleRandomMeal}>surprise me!</button>
      </form>
    </header>
  )
}

export default Search