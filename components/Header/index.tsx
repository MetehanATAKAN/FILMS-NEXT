'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './style.module.css';
import type {LinkProps } from 'next/link';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import axios from 'axios';
import Link from 'next/link';

type GenresType = {
  key:number,
  label:React.ReactNode
}

type GenresApiType = {
  id:number,
  name:string
}

const Header: React.FC = () => {

  const [items, setItems] = useState<GenresType[]>([]);
  
  const [scrollPosition, setScrollPosition] = useState(0);
  const listRef = useRef<any>(null);

  console.log(scrollPosition);
  

  const scrollToTop = () => {
    setScrollPosition(0);
    listRef.current.scrollTop = 0;
  };

  const scrollToBottom = () => {
    const scrollHeight = listRef.current.scrollHeight;
    const height = listRef.current.clientHeight;
    const maxScrollTop = scrollHeight - height;
    setScrollPosition(maxScrollTop);
    listRef.current.scrollTop = maxScrollTop;
  };
  
  const genresApi = async () => {
    try {
      const response = await axios({
        method:'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.TOKEN_KEY}`
        },
        url:'https://api.themoviedb.org/3/genre/movie/list'
      });
      const result : GenresApiType[] = await response.data.genres;
      setItems(result.map(gen => (
        {
          label:(<Link key={gen.id} href={`/genreMovie/${gen.id}`}> {gen.name} </Link>), 
          key:gen.id
        }
      )))
      
    } catch (error) {
      
    }
  }
  useEffect(() => {
   genresApi();
  }, [])
  

  return (
    <div className={styles.header}>

      <div>
      <Link href={'/'}>
        <span className={styles.logo}>MOVIES</span>
      </Link>
      </div>

      <div className={styles.menus} ref={listRef}>
        <Dropdown menu={{ items }} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Genres
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  )
}

export default Header