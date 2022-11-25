import { LoadingButton } from "@mui/lab";
import { Avatar, Box, CircularProgress, Tooltip, Typography, useMediaQuery } from "@mui/material"
import { deepOrange } from '@mui/material/colors';
import { useEffect, useState } from "react";
import { getGames, getGenres, getNextGames, searchGames } from "../../services/rawgio";
import { GameCard } from "./components/GameCard";
import { GenreCard } from "./components/GenreCard";
import { SearchInput } from "./components/SearchInput";
import styles, { gamesContainer } from './styles'
export function HomeView() {
  const [games,setGames] = useState([])
  const [genres,setGenres] = useState([])
  const [firstLoading,setFirstLoading] = useState(true)
  const [next,setNext] = useState(false)
  const [loading,setLoading] = useState(false)
  const [gamesLoading,setGamesLoading] = useState(false)
  const isSmallScreen = useMediaQuery('(max-width:860px)') 
  const isMidScreen = useMediaQuery('(max-width:1440px)');
  const isLargeScreen = useMediaQuery('(max-width:1600px)');
  const isLargeXScreen = useMediaQuery('(max-width:4000px)');


  const  getAllGames = async ()=>{
    try{
      const games = await getGames();
      setGames(games.results)
      setNext(games.next || false)
    } catch {
      console.log('DEU ERRO')
    }
  }
  const  getAllGenres = async ()=>{
    try{
      const genresReponse = await getGenres();
      setGenres(genresReponse.results)
     
    } catch {
      console.log('DEU ERRO')
    }
  }
  const getNextPageGames = async () =>{
   
    try{
      setLoading(true)
      const nextGames = await getNextGames(next)
      setGames([...games,...nextGames.results])
      setNext(nextGames.next || false)
      setLoading(false)
    } catch {
      setLoading(false)
      console.log('DEU ERRO')
    }
  }

  const search = async (value)=>{
    try{
      setGamesLoading(true)
      const searchedGames = await searchGames(value);
      setGames(searchedGames.results)
      setNext(searchedGames.next || false)
      setGamesLoading(false)
    } catch {
      setGamesLoading(false)
      console.log('DEU ERRO')
    }
  }
  const loadInitialData = async()=>{
    await Promise.all([getAllGames(),getAllGenres()])
    document.body.style.backgroundColor= '#151515';
    setFirstLoading(false)
  }
  useEffect(()=>{
    loadInitialData()
  },[])

  
  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <img style={{width:'120px'}} src="/logoRandazzo.png"/>
        <SearchInput search={search}/>
        <Tooltip title="Lucas Randazzo">
        <Avatar sx={{ bgcolor: deepOrange[500] }}>L R</Avatar>
        </Tooltip>
      </Box>
      {firstLoading ? (
      <Box sx={{
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'100vh'
      }}>
        <CircularProgress color="warning"/>
      </Box> ):(
        <>
                <Typography variant="h4" sx={styles.preTitle}>Jogos</Typography>

                <Box sx={ gamesLoading ? {
                       display: 'flex',
                       width:'100%',
                       justifyContent:'center',
                       alignItems:'center'
                } : gamesContainer(isSmallScreen,isMidScreen,isLargeScreen,isLargeXScreen)}>
              
                {gamesLoading ? 
                  <CircularProgress color="warning" />
                  : (
                        games.length ? games.map(game=>(
                          <GameCard key={String(game.id)} game={game}/>
                        )) : <Typography>Nenhum jogo encontrado :(</Typography>
                )}
                </Box>
                <Box sx={styles.buttonContainer}>
                {next.length && (<LoadingButton sx={{
                  '&:disabled':{
                    background:deepOrange[500],
                  }
                }} loading={loading} onClick={getNextPageGames} disabled={!next.length} size="large" variant="contained" color="warning">
                   Carregar mais jogos
                </LoadingButton>)}
                </Box>
                <Typography variant="h4" sx={styles.preTitle}>Gêneros </Typography>
                <Box sx={gamesContainer(isSmallScreen,isMidScreen,isLargeScreen,isLargeXScreen)}>
                  {genres.length ? genres.map(genrer=>(
                    <GenreCard key={String(genrer.id)} genrer={genrer}/>
                  )) : <Typography>Nenhum Gênero encontrado :(</Typography>}
                </Box>
                <Box sx={ genres.length && games.length ? {
                height:'24px',
                color:'#FFF',
                background: deepOrange[500],
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '24px',
                fontSize: '14px',
         
      } : {
        height:'24px',
        color:'#FFF',
        background: deepOrange[500],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px',
        fontSize: '14px',
        position:'absolute',
        bottom:'0px',
        left:'0px',
        right:'0px'
      }}>
      © Copyright 2022 - Disciplina de Desenvolvimento de Interfaces Web - developed by Lucas Randazzo
      </Box>
      </>
      )}

   
    </Box>
  )
}
