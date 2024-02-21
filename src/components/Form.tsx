import { useState } from 'react'
import { API_URL } from '../API_URL'
import { v4 as uuid } from 'uuid'
import { TextField, Button, Stack } from '@mui/material/'

interface FormProps {
  changeAnswerStatus: () => void
  userData: object
}

const Form: React.FC<FormProps> = ({ changeAnswerStatus, userData }) => {
  const [input, setInput] = useState('')

  const handleChange = (value: string) => {
    if (!value.includes('\n')) {
      setInput(value)
    }
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSubmit()
  }

  const adminDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/all`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        console.log('Deleted all successfully')
      } else {
        console.error('Failed to delete all')
      }
    } catch (error) {
      console.error('Error deleting all:', error)
    }
  }

  const handleSubmit = async () => {
    if (input === '') {
      return null
    }

    if (input === 'ADMIN-DELETE') {
      adminDelete()
      return null
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: uuid(), input: input, userData: userData })
      })

      if (response.ok) {
        console.log('Form submitted successfully')
        setInput('')
        changeAnswerStatus()
      } else {
        console.error('Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const handleEnterKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <>
      <h2>Henceforth, thy feed shall be inscribed.</h2>
      <h2>It shall be revealed unto all in time.</h2>
      <div className='card'>
        <Stack spacing={2} component='form' onSubmit={handleFormSubmit}>
          <TextField
            id='filled-multiline-flexible'
            multiline
            value={input}
            onChange={(event) => handleChange(event.target.value)}
            onKeyDown={handleEnterKey}
            variant='filled'
          />
          <Button type='submit' variant='contained'>
            Beseech to present thy feedback
          </Button>
        </Stack>
      </div>
    </>
  )
}

export default Form
