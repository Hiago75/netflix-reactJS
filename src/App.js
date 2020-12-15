import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header'

export default () => {

  const [movieList, setMoveList] = useState([])
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMoveList(list)

      //Pegando item em destaque
      let originals = list.filter(i=>i.slug === 'originals');
      let randomFilm = Math.floor(Math.random() * originals[0].items.results.length - 1)
      let chosen = originals[0].items.results[randomFilm]
      let filmInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      console.log(filmInfo)
      setFeaturedData(filmInfo)
    }

    loadAll();
  }, [])

  useEffect(()=>{
    const scrollListener= () =>{
      if(window.scrollY > 10)
        setBlackHeader(true)
      else
        setBlackHeader(false)
    }

    window.addEventListener('scroll', scrollListener);

    return () =>{
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className="page">

      <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
    </div>
  )
}