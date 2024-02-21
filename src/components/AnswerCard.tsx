import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
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

interface AnswerCardProps {
  userData: {
    nickname: string
    userId: string
    animal: keyof typeof animals
  }
  content: string
}

const AnswerCard: React.FC<AnswerCardProps> = ({ userData, content }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant='h6' component='div' align='left'>
          {userData.nickname} <FontAwesomeIcon icon={animals[userData.animal]} />
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          {content}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default AnswerCard
