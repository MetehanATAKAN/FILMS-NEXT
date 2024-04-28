'use client'

import GenreMovies from '@/components/GenreMovies';
import PaginationCustom from '@/components/Pagination';
import { GenreMovieType } from '@/types/common';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const GenreMovie = ({params}:{
    params:{
        genreId:string
    }
}) => {
   
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1)
    const [movies, setMovies] = useState<GenreMovieType[]>([]);

    const discoverMovieApi = async () => {
        try {
            const response = await axios({
                method: 'GET',
                url: 'https://api.themoviedb.org/3/discover/movie',
                params: {
                  include_adult: 'false',
                  include_video: 'false',
                  language: 'en-US',
                  with_genres: params.genreId,
                  page:currentPage
                },
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMGZlNjNmNzA2ZTU2YmFkNDcwZGFhNjIyZjA1ZjE4NyIsInN1YiI6IjY0ZGIyMzI3ZDEwMGI2MDEzOTVlZjc5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y0mwDPt0FY-atSz_WyFPZP77kjOoX1UZAgrm-leHZ3w'
                  }
            })
            const result = await response.data;
            setTotalPage(result.total_pages);
            setMovies(result.results);
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(() => {
       if(params.genreId) discoverMovieApi();
    }, [params.genreId , currentPage])
    
    
  return (
    <div>

        <GenreMovies movies={movies}/>
        <div>
            <PaginationCustom current={currentPage} totalPage={totalPage} setCurrent={setCurrentPage}/>
        </div>
     </div>
  )
}

export default GenreMovie