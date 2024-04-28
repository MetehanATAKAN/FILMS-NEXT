import { GenreMovieType } from '@/types/common'
import Image from 'next/image'
import React from 'react'
import styles from './style.module.css';

const GenreMovies = ({movies}:{
    movies:GenreMovieType[]
}) => {
  return (
    <div className={styles.genre_movies} >
        {
            movies.map(item =>(
                <div key={item.id} className={styles.movie_card}>
                    <div className={styles.image}>
                        <Image 
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt={item.title}
                        width={300}
                        height={300}
                        className={styles.img}
                         />
                    </div>

                    <div className={styles.movie_name}>
                        {item.title}
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default GenreMovies