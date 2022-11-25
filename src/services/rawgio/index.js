import { api } from "./api"

//  PASSAR PRA ENV 

const ACCESS_KEY = 'dc474d519ab44f39acf7507f10071ab3'


export const getGames = async ()=>{
  const response = await api.get(`/games?page_size=12&key=${ACCESS_KEY}`)
  return response.data
}
export const getGenres = async ()=>{
  const response = await api.get(`/genres?key=${ACCESS_KEY}`)
  return response.data
}

export const getNextGames = async (url)=>{
  const response = await api.get(url)
  return response.data
}

export const searchGames = async (value)=>{
  const response = await api.get(`/games?page_size=12&key=${ACCESS_KEY}&search=${value}`)
  return response.data
}

export const getGameByID = async (id)=>{
  const response = await api.get(`/games/${id}?key=${ACCESS_KEY}`)
  return response.data
}

export const getCreators= async (id)=>{
  const response = await api.get(`/games/${id}/development-team?key=${ACCESS_KEY}`)
  return response.data
}
