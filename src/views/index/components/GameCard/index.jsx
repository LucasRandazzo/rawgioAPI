import { Box, Divider, Typography } from "@mui/material";
import { useRouter } from "next/router";
import styles from './styles'

export function GameCard({game}){

  const {push} = useRouter()
  const getGenres = ()=>{
    const genresNames = game.genres.map(item=>item.name).join(', ')
    return genresNames || 'N/A'
  }

  const formatReleasedDate= ()=>{
    if(!game.released){
      return 'N/A'
    }
    const date = game.released 
    const split = date.split('-')
    const newDate = `${split[2]}/${split[1]}/${split[0]}`
  
    return newDate
  }
  formatReleasedDate()
  return (
    <Box onClick={()=> push(`detalhes/${game.id}`) } sx={styles.container}>
      <img src={game.background_image}/>
      <Box sx={styles.content}>

      <Typography sx={styles.name}>{game.name}</Typography>
       <Box sx={styles.contentInfo}>
        <Box sx={styles.contentInfoData}>
        <Typography>Data de Lançamento:</Typography>
        <Typography>{formatReleasedDate()}</Typography>
        </Box>
        <Divider sx={styles.divider}/>
       </Box>
       <Box sx={styles.contentInfo}>
       <Box sx={styles.contentInfoData}>
        <Typography>Gêneros:</Typography>
        <Typography>{getGenres()}</Typography>
        </Box>
        <Divider sx={styles.divider}/>
       </Box>
      </Box>

      </Box>
    
  )
}