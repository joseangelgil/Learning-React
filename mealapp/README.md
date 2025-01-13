# Meals Application

#### Global Styles Info

#### Setup Structure

- create /src/components
- Favorites.jsx, Meals.jsx, Modal.jsx, Search.jsx
- create component (arrow function)
- setup basic return (component name)
- or my personal favorite "shake and bake"
- export default

```js
const Search = () => {
  return <h1>Dude, Where is my car</h1>
}
export default Search
```

- import all of them in App.js
- setup following structure

```js
import './App.css'
import Search from './components/Search'
import Meals from './components/Meals'
import Modal from './components/Modal'
import Favorites from './components/Favorites'

export default function App() {
  return (
    <main>
      <Search />
      <Favorites />
      <Meals />
      <Modal />
    </main>
  )
}
```

- comment out Search, Favorites, Modal

```js
export default function App() {
  return (
    <main>
      {/* <Search /> */}
      {/* <Favorites /> */}
      <Meals />
      {/* <Modal /> */}
    </main>
  )
}
```

#### App Level State

- in App.js
- Context API
- 3rd Party State Management Library
- Redux, Redux-Toolkit,....... (not used in this project)


#### Context API 

- create context.js in the root


context.jsx
```js

import React, {useContext} from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  return (
    <AppContext.Provider value="hello">
     {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
```

index.jsx
```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppProvider } from './context'
ReactDOM.createRoot(document.getElementVyId('root')).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
)
```

#### Consume Data

/components/Meals.jsx

```js
import { useContext } from 'react'
import { Appcontext } from '../context'

const Meals = () => {
  const context = useContext(AppContext);
  console.log(context)
  return (
    <h1>Meals Component</h1>
  )
}

export default Meals
```

#### Custom Hook

context.jsx
```js
export const useGlobalContext = () => {
  return useContext(AppContext)
}
```


#### Data Fetching

- where and how

context.jsx
```js
import React, { useContext, useEffect } from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  useEffect(() => {
    console.log('fetch data here')
  }, [])

  return (
    <AppContext.Provider value={{name: 'John', role: 'Student'}}>
      {children}
    </AppContext.Provider>
  )
}
```

- fetch data (fetch API or axios), from any url in useEffect cb
- log result

#### Fetch API

- [Fetch API]
- [random user]

context.jsx
```jsx
const AppProvider = ({ children }) => {
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await ferch('https://randomuser.me/api/')
        const data = await response.json()
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
}
```

```jsx
const AppProvider = ({ children }) => {

  const fetchData = async() => {
    try {
      const response = await fetch('https://randomuser.me/api/')
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  } 

  useEffect(/*we cannot use async here*/() => {   
    
    fetchData()
    // .then or async/await 

    // fetch().then
    // para usar async/await podemos crear una funcion aquí dentro e invocarla o podemos crearla fuera del useEffect e invocarla aquí. pero no se puede hacer la propia funcion del useEffect async.
  }, [])

  return (
    <AppContext.Provider value={{name: 'John', role: 'student'}}>
      {children}
    </AppContext.Provider>
  )
}
```


#### Meals DB

- utilize search engine "meals db", follow the link
- [Meals DB](https://www.themealdb.com/api.php)
- get familiar with docs
- get two url's
  - Search meal by name
  - Lookup a single random meal
- (hint the "https://" is missing)
- setup two variables in context.jsx
- (allMealsUrl, randomMealUrl) and assign the correspondeing values


#### Get Meals By Name (with axios)

[Axios](https://www.freecodecamp.org/news/how-to-use-axios-with-react/)

- install axios
- import in context-jsx
- refactor fetchData
  - change name
  - switch to axios
  - add url parameter
  - switch to allMealsUrl
  - log response


context.jsx
```js
import React, { useState, usecontext, useEffect } from 'react'
import axios from 'axios'

const AppContext = React.createContext()

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=a'
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const AppProvider = ({ children }) => {

  const fetchMeals = async(url) => {
    try {
      const response = await axios(url)
      console.log(response)
    } 
    catch (e) {
      console.log(e.response)
    }
  }

  useEffect(() => {       
    fetchMeals(allMealsUrl)
  }, [])
}
```


#### State Variable (meals) and render

- import useState hook
- setup state variable (meals)
- set it equal to the meals from api
- pass it down to entire app (value prop)
- destructure meals in the Meals component
- iterate over meals
  - log each meal
  - render something (anything) on the screen


context.jsx
```jsx
import React, { useState, useContext, useEffect } from 'react'

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([])

  const fetchMeals = async (url) => {

    try {
      const { data } = await axios.get(url)
      setMeals(data.meals)
    }
    catch (e) {
      console.log(e.response)
    }

  }

  useEffect(() => {
    fetchMeals(allMealsUrl)
  }, [])

  return (
    <AppContext.Provider value={{ meals }}>
      {children}
    </AppContext.Provider>
  )
}
```


/components/Meals.jsx
```js
import { useGlobalContext } from '../context'

const Meals = () => {
  const { meals } = useGlobalContext();

  return (
    <section>
      {meals.map((singleMeal) => {
        console.log(singleMeal)
        return <h4>single meal</h4>
      })}
    </section>
  )
}

export default Meals
```


/components/Meals.jsx
```js
import { useGlobalContext } from '../context'

const Meals = () => {
  const { meals } = useGlobalContext();

  return (
    <section className='section-center'>
      {meals.map((singleMeal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = singleMeal
        return (
          <article key={idMeal} className="single-meal">
            <img src={image} style={{width: '200px'}} className='img' />
            <footer>
              <h5>{title}</h5>
              <button className='like-btn'>click me</button>
            </footer>
          </article>
        )
      })}
    </section>
  )
}

export default Meals
```


#### Meals CSS

#### React Icons

[React Icons](https://react-icons.github.io/react-icons/)
- install
- import
- set icon in like button


#### Infinite Loop

- Feel free to just watch
1. initial render (we invoke useEffect)
2. inside useEffect call back, we fetch data and change value for meals
3. it triggers re-render
4. we repeat steps 2 and 3


#### Loading

- setup state variable "loading", with default value false
- set loading to true as a first thing in fetchMeals
- set loading to false as a last thing in fetchMeals
- add loading to value prop (pass it down)
- in Meals.jsx set condition for loading
  - it needs to be before current return 
  - return <h4>Loading...</h4> if loadin is true

context.jsx
```js
const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const { data } = await axios.get(url)
      setMeals(data.meals)
    }
    catch (e) {
      console.log(e.response)
    }
    setLoading(false)
  }

  return (
    <AppContext.Provider value={{ loading, meals }}>
      {children}
    </AppContext.Provider>
  )
}
```

/components/Meals.jsx
```js
import { useGlobalContext } from '../context'
import { BsHandThumbsUp } from 'react-icons/bs'

const Meals = () => {
  const { loading, meals } = useGlobalContext();

  if(loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    )
  }

  return (...)
}
```


#### No items

- in fetchMeals check if data.meals is truthy
  - returns true 
  - basically has some value 
- only if data.meals has items set it as meals state value
- otherwise set meals variable as empty array
- in Meals.jsx check if meals length is less than 1
  - if that's the case return <h4>No items</h4>
  - place it between loading and current return (cards)


context.jsx
```js
const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const { data } = await axios.get(url)
      if (data.meals) {
        setMeals(data.meals)
      }
      else {
        setMeals([])
      }
    }
    catch (e) {
      console.log(e.response)
    }
    setLoading(false)
  }
  return (
    <AppContext.Provider value={{ loading, meals }}>
      {children}
    </AppContext.Provider>
  )
}
```


/components/Meals.jsx
```js
import { useGlobalContext } from '../context'
import { BsHandThumbsUp } from 'react-icons/bs'

const Meals = () => {
  const { loading, meals } = useGlobalContext();

  if(loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    )
  }

  if(meals.length < 1) {
    return (
      <section className="section">
        <h4>No meals matched your search term. Please try again.</h4>
      </section>
    )
  }

  return (...)
}
```


#### Search Component - Structure

- in Search.jx
- import useState and useGlobalContext
- setup return 
  - header.search-container
  - form
    - input.form-input type="text"
    - button.btn type="submit"
    - button.btn.btn-hipster type="btn"
- in App.jsx display Search.jsx

/components/Search.jsx
```js
import { useState } from 'react'
import { useGlobalContext } from '../context'

const Search = () => {
  
return (
  <header className="search-container">
    <form>
      <input className='form-input' type='text' />
      <button className='btn' type='btn'></button>
      <button className='btn btn-hipster' type='btn'></button>
    </form>
  </header>
)

}
export default Search
```

#### Search Component - CSS

#### handleChange and handleSubmit
- create "text" state variable
- create two functions handleChange and handleSubmnit
- in the handleChange, grab e.target.value and set as text value
- add onChange to input and set it equal to handleChange
- in the handleSubmit set e.preventDefault()
- add onSubmit to form element and set it equal to handleSubmit

Search.jsx
```js
import { useState } from 'react'
import { useGlobalContext } from '../context'

const Search = () => {

  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  
  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input className='form-input' type='text' onChange={handleChange}/>
        <button className='btn' type='btn'></button>
        <button className='btn btn-hipster' type='btn'></button>
      </form>
    </header>
  )

}
export default Search
```


#### Search Term

- in context.jsx create new state variable "searchTerm" with default value ''
- combine allMealsUrl with searchTerm and pass in the fetchMeals
- add searchTerm to useEffect's dependency array
- add setSEarchTerm to value prop (pass it down)
- grab setSearchTerm in Search.jsx
- in the handleSubmit check setup a condition
  - if the "text" has a value set it equal to "searchTerm"

context.jsx
```js
const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const { data } = await axios.get(url)
      if (data.meals) {
        setMeals(data.meals)
      }
      else {
        setMeals([])
      }
    }
    catch (e) {
      console.log(e.response)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMeals(`${allMealsUrl}${searchTerm}`)
  }, [searchTerm])

  return (
    <AppContext.Provider value={{ loading, meals, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  )
}
```

/components/Search.jsx
```js
import { useState } from 'react'
import { useGlobalContext } from '../context'

const Search = () => {

  const { setSearchTerm } = useGlobalContext()
  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(text) {
      setSearchTerm(text)
      setText('')
    }
  }
  
  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input className='form-input' type='text' onChange={handleChange}/>
        <button className='btn' type='submit'></button>
        <button className='btn btn-hipster' type='button'></button>
      </form>
    </header>
  )

}
export default Search
```


#### Fetch Random Meal


context.jsx
```js
const AppProvider = ({ children }) => {

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl)
  } // It has to go after fetchMeals declaration*

  return (
    <AppContext.Provider value={{ loading, meals, setSearchTerm, fetchRandomMeal }}>
      {children}
    </AppContext.Provider>
  )
}
```

/components/Search.jsx
```js
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
      setText('')
    }
  }
  
  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input className='form-input' type='text' onChange={handleChange}/>
        <button className='btn' type='submit'></button>
        <button className='btn btn-hipster' type='button' onClick={fetchRandomMeal}></button>
      </form>
    </header>
  )

}
export default Search
```


#### Fix Bugs

#### searchTerm states remains equal to our last search when we press random button

/components/Search.jsx
```js
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
      setText('')
    }
  }

  // We add a handleRandomMeal to clear setSearchTerm and setText when we look randomly
  const handleRandomMeal = () => {
    setSearchTerm('')
    setText('')
    fetchRandomMeal()
  }
  
  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input className='form-input' type='text' onChange={handleChange}/>
        <button className='btn' type='submit'></button>
        <button className='btn btn-hipster' type='button' onClick={handleRandomMeal}></button>
      </form>
    </header>
  )

}
export default Search
```

#### useEffect running extra time

- Because our previous change, when we click first click in random meal, it changes the state of searchTerm, which triggers our useEffect and reload the Meals.
- To fix this we add another useEffect to load all meals one time only when we first load the page and another to handle every change in searchTerm ONLY IF searchTerm !== ''.

```js
  useEffect(() => {
    fetchMeals(allMealsUrl)
  }, []) // Renders allMealsUrl just one time when we first load the page.

  useEffect(() => {     
    if(!searchTerm) return  
    fetchMeals(`${allMealsUrl}${searchTerm}`)
  }, [searchTerm]) // Renders the meals with the searchTerm ONLY if searchTerm !== ''.
```


#### Modal - Setup

/components/Modal.jsx
```js
import { useGlobalContext } from '../context'

const Modal = () => {
  return (
    <aside className='modal-overlay'>
      <div className='modal-container'>
        modal content here
      </div>
    </aside>
  )
}

export default Modal
```

context.jsx
```js
const AppProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <AppContext.Provider value={{ loading, meals, setSearchTerm, ferchRandomMeal, showModal }}>
  )
}
```

App.jsx
```js
import { useGlobalContext } from './context'
import './App.css'
import Search from './components/Search'
import Meals from './components/Meals'
import Favorites from './components/Favorites'
import Modal from './components/Modal'

export default function App() {
  const { showModal } = useGlobalContext()

  return (
    <main>
      <Search />
      {/*<Favorites />*/}
      <Meals>
      {showModal && <Modal />}
    </main>
  )
}
```


#### Display Meal in the Modal

context.jsx
```js
const AppProvider = ({ children }) => {
  const [selectedMeal, setSelectedMeal] = useState(null)

  const selectMeal = (idMeal, favoriteMeal) => {
    let meal; 

    meal = meals.find((meal) => meal.idMeal === idMeal);

    setSelectedMeal(meal)
    setShowModal(true)
  }

  return (
    <AppContext.Provider value={{ loading, meals, setSearchTerm, ferchRandomMeal, showModal, selectMeal, selectedMeal }}>
      {children}
    </AppContext.Provider>
  )
}
```


/components/Meals.jsx
```js
import { useGlobalContext } from '../context'
import { BsHandThumbsUp } from 'react-icons/bs'

const Meals = () => {
  const { loading, meals, selectMeal } = useGlobalContext();

  if(loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    )
  }

  if(meals.length < 1) {
    return (
      <section className="section">
        <h4>No meals matched your search term. Please try again.</h4>
      </section>
    )
  }

  return (
    <section className='section-center'>
      {meals.map((singleMeal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = singleMeal
        return (
          <article key={idMeal} className="single-meal">
            <img src={image} className='img' onClick={() => selectMeal(idMeal)}/>
            <footer>
              <h5>{title}</h5>
              <button className='like-btn'><BsHandThumbsUp /></button>
            </footer>
          </article>
        )
      })}
    </section>
  )
}

export default Meals

```



#### Display Selected Meal and Close Modal

context.jsx
```js
const AppProvider = ({ children }) => {
  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <AppContext.Provider value={{ loading, meals, setSearchTerm, ferchRandomMeal, showModal, selectMeal, selectedMeal, closeModal }}>
       {children}
    </AppContext.Provider>
  )
}
```

/components/Modal.jsx
```jsx
import { useGlobalContext } from '../context'

const Modal = () => {
  const { selectedMeal, closeModal } = useGlobalContext()

  const { strMealThumb: image, strMeal: title, strInstructions: text, strSource: source } = selectedMeal

  return (
    <aside className='modal-overlay'>
      <div className='modal-container'>
        <img src={image} className='img modal-img' />
        <div className='modal-content'>
          <h4>{title}</h4>
          <p>Cooking Instructions</p>
          <p> {text}</p>
          <a href={source} target='_blank' rel='noopener noreferrer'>Original Source</a>
          <button className='btn btn-hipster close-btn' onClick={closeModal}>close</button>
        </div>
      </div>
    </aside>
  )
}

export default Modal
```


#### Favorites - Setup

context.jsx
```js
const AppProvider = ({ children }) => {

  const [favorites, setFavorites] = useState([]);

  const adToFavorites = (idMeal) => {
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    cocnst alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
    if(alreadyFavorite) return
    const updatedFavorites = [...favorites, meal]
    setFavorites(updateFavorites)
  } 
  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) =>  meal.idMeal !== idMeal);
    setFavorites(updatedFavorites)
  }

  return (
    <AppContext.Provider valur={{ loading, meals, setSEarchTerm, fetchRandomMeal, showModal, selectMeal, selectedMeal, closeModal, favorites, addToFavorites, removeFromFavorites, favorites }}>
      {children}
    </AppContext.Provider>
  )
}
```

/components/Meals.jsx
```js
import { useGlobalContext } from '../context'
import { BsHandThumbsUp } from 'react-icons/bs'
const Meals = () => {
  const { loading, meals, selectMeal, addToFavorites } = useGlobalContext();

  if(loading) {
    return (
      <section className = 'section'>
        <h4>Loading...</h4>
      </section>
    )
  }

  if(meals.length < 1) {
    return (
      <section className = 'section'>
        <h4>No meals matched your search term. Please try again.</h4>
      </section>
    )
  }

  return (
    <section className='section-center'>
      {meals.map((singleMeal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = singleMeal
        return (
          <article key={idMeal} className="single-meal">
            <img src={image} className='img' onClick={() => selectMeal(idMeal)}/>
            <footer>
              <h5>{title}</h5>
              <button className='like-btn' onClick={() => addToFavorites(idMeal)}><BsHandThumbsUp /></button>
            </footer>
          </article>
        )
      })}
    </section>
  )
}
```



#### Render Favorites

App.jsx
```js
import './App.css'
import { useGlobalContext } from './context'
import Favorites from './components/Favorites'
import Meals from './components/Meals'
import Modal from './components/Modal'
import Search from './components/Search'

function App() {

  const { showModal, favorites } = useGlobalContext()

  return (
    <main>
      <Search />
      {favorites.length > 0 && <Favorites />}
      <Meals />
      {showModal && <Modal />}
    </main>
  )
}

export default App
```

/components/Favorites.jsx
```js
import { useGlobalContext } from '../context'

const Favorites = () => {
  const { favorites, selectMeal, removeFromFavorites } = useGlobalContext()

  return (
    <section className='favorites'>
      <div className='favorites-content'>
        <h5>Favorites</h5>
        <div className='favorites-container'>
          {favorites.map((item) => {
            const { idMeal, strMealThumb: image } = item;

            return (
              <div key={idMeal} clasName='favorite-item'>
                <img src={image} className='favorites-img img' onClick={() => selectMeal(idMeal, true)}/>
                <button className='remove-btn' onClick={() => removeFromFavorites(idMeal)}>remove</button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Favorites
```


#### SelectMeal Refactor

context.jsx
```js
const selectMeal = (idMeal, favoriteMeal) => {
  let meal;
  if(favoriteMeal) {
    meal = favorites.find((meal) => meal.idMeal === idMeal);
  } else {
    meal = meals.find((meal) => meal.idMeal === idMeal);
  }

  setSelectedMeal(meal);
  setShowModal(true)
}
```


