import { useEffect, useState } from 'react'
import { API_URL } from '../API_URL'
import AnswerCard from './AnswerCard'
import { Button, Grid } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Delete, RateReview } from '@mui/icons-material'

const animals = {
  cat: 'faCat',
  crow: 'faCrow',
  dog: 'faDog',
  dove: 'faDove',
  dragon: 'faDragon',
  fish: 'faFish',
  frog: 'faFrog',
  hippo: 'faHippo',
  horse: 'faHorse',
  otter: 'faOtter',
  spider: 'faSpider'
}

type Answer = {
  id: string
  input: string
  userData: {
    nickname: string
    userId: string
    animal: keyof typeof animals
  }
}

interface SummaryProps {
  changeAnswerStatus: () => void
  userData: {
    nickname: string
    userId: string
    animal: keyof typeof animals
  }
}

const Summary: React.FC<SummaryProps> = ({ changeAnswerStatus, userData }) => {
  const [answers, setAnswers] = useState<Answer[]>([])

  const getAnswers = async () => {
    try {
      const response = await fetch(API_URL)
      if (response.ok) {
        const allAnswers = await response.json()
        setAnswers(allAnswers)
      } else {
        console.error('Failed to get answers')
        setAnswers([])
      }
    } catch (error) {
      console.error('Error fetching answers:', error)
    }
  }

  const handleUpdate = () => {
    getAnswers()
  }

  const handleRemove = async (id: string) => {
    if (!confirm('Confirm delete?')) {
      return null
    }
    console.log('trying to delete id:', id)
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        console.log('Deleted successfully')
        getAnswers()
      } else {
        console.error('Failed to delete', { id })
      }
    } catch (error) {
      console.error('Error deleting card:', error)
    }
  }

  const handleReturn = () => {
    changeAnswerStatus()
  }

  useEffect(() => {
    getAnswers()
  }, [])

  return (
    <>
      <h2>In this place, the feedbacks of the common folk are duly recorded.</h2>
      <Button
        onClick={handleReturn}
        variant='contained'
        endIcon={<RateReview />}
        style={{ marginBottom: '16px', marginRight: '5px' }}
      >
        Submit feedback
      </Button>
      <Button
        onClick={handleUpdate}
        variant='contained'
        endIcon={<RefreshIcon />}
        style={{ marginBottom: '16px' }}
      >
        Update wall
      </Button>
      {answers.length === 0 ? (
        <p>Nothing</p>
      ) : (
        <Grid container spacing={2}>
          {answers.map((answer) => (
            <Grid item key={answer.id} xs={12} sm={6} md={4}>
              {answer.userData.userId === userData.userId ? (
                <Button
                  endIcon={<Delete />}
                  color='secondary'
                  onClick={() => handleRemove(answer.id)}
                ></Button>
              ) : (
                <Button disabled endIcon={<Delete />}></Button>
              )}
              <AnswerCard userData={answer.userData} content={answer.input} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}

export default Summary
