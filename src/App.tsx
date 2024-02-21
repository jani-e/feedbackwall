import { useState, useEffect, useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCat,
  faCrow,
  faDog,
  faDove,
  faDragon,
  faFish,
  faFrog,
  faHippo,
  faHorse,
  faOtter,
  faSpider
} from '@fortawesome/free-solid-svg-icons'
import './App.css'
import Form from './components/Form'
import Summary from './components/Summary'

const animals = {
  cat: faCat,
  crow: faCrow,
  dog: faDog,
  dove: faDove,
  dragon: faDragon,
  fish: faFish,
  frog: faFrog,
  hippo: faHippo,
  horse: faHorse,
  otter: faOtter,
  spider: faSpider
}

interface UserData {
  userId: string
  nickname: string
  animal: keyof typeof animals
}

function App() {
  const [storedUserData, setStoredUserData] = useState<UserData>({
    userId: uuid(),
    nickname: 'Unknown',
    animal: 'otter'
  })
  const [answered, setAnswered] = useState(false)

  const getRandomAnimal = useCallback((): keyof typeof animals => {
    const animalKeys = Object.keys(animals) as (keyof typeof animals)[]
    const randomIndex = Math.floor(Math.random() * animalKeys.length)
    return animalKeys[randomIndex]
  }, [])

  const getRandomAdjective = () => {
    const adjectives = [
      'Vicious',
      'Laughing',
      'Fluffy',
      'Cute',
      'Cautious',
      'Ferocious',
      'Wise',
      'Wild',
      'Magical',
      'Calculative',
      'Slithering',
      'Dexterous',
      'Playful',
      'Cuddly',
      'Clever',
      'Noisy',
      'Sneaky'
    ]
    const random = Math.floor(Math.random() * adjectives.length)
    return adjectives[random]
  }

  const generateUserToSessionStorage = useCallback(() => {
    const initialAnimal = getRandomAnimal()
    const adjective = getRandomAdjective()
    const userData = {
      userId: uuid(),
      nickname: adjective + initialAnimal.charAt(0).toUpperCase() + initialAnimal.slice(1),
      animal: initialAnimal
    }
    sessionStorage.setItem('user', JSON.stringify(userData))
    setStoredUserData(userData)
  }, [getRandomAnimal])

  const readDataFromSessionStorage = useCallback(() => {
    const dataFromSessionStorage = sessionStorage.getItem('user')
    if (dataFromSessionStorage) {
      setStoredUserData(JSON.parse(dataFromSessionStorage))
    } else {
      generateUserToSessionStorage()
    }
  }, [setStoredUserData, generateUserToSessionStorage])

  const changeAnswerStatus = () => {
    setAnswered(!answered)
  }

  useEffect(() => {
    readDataFromSessionStorage()
  }, [readDataFromSessionStorage])

  return (
    <>
      <div className='top-right-corner'>
        Welcome {storedUserData.nickname} <FontAwesomeIcon icon={animals[storedUserData.animal]} />!
      </div>
      <h1>Feedback Wall</h1>
      {answered ? (
        <Summary changeAnswerStatus={changeAnswerStatus} userData={storedUserData} />
      ) : (
        <Form changeAnswerStatus={changeAnswerStatus} userData={storedUserData} />
      )}
    </>
  )
}

export default App
