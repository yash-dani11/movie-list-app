import Header from "./components/Header/Header";
import MovieContainer from "./components/MovieContainer/MovieContainer";
import "./App.css";
import { useState,useRef, useEffect } from "react";
import { defaultYearInView } from "./utils/constants";
import useInfiniteScroll from "./utils/useInfiniteScroll";
const App = ()=>{
    const defaultYears = [defaultYearInView-1,defaultYearInView,defaultYearInView+1];
    const [selectedGenre,setSelectedGenre] = useState([-1]);
    const infiniteDownRef = useRef();
    const infiniteUpRef = useRef();
    const defaultYearRef = useRef();
    const [movieYears,setMovieYears] = useState([defaultYearInView-1,defaultYearInView,defaultYearInView+1]);

    const filter = (genreId)=>{
        setSelectedGenre(genreId);
        setMovieYears(defaultYears);
        defaultYearRef?.current?.scrollIntoView({behavior:"instant",block:"start"});
    }
    useEffect(()=>{
        defaultYearRef?.current?.scrollIntoView({behavior:"instant",block:"start"});
    },[]);
    useEffect(()=>{
        useInfiniteScroll(infiniteUpRef.current,infiniteDownRef.current,setMovieYears);
    },[movieYears]);
    const movieContainerList = movieYears.map((year,index)=>{
        let ref = null;
        if(year === defaultYearInView){
            ref = defaultYearRef;
        }
        else if(index ===0){
            ref = infiniteUpRef;
        }
        else if(index=== movieYears.length-1){
            ref = infiniteDownRef;    
        }
        return <MovieContainer year={year} genre = {selectedGenre} key={year} ref={ref}></MovieContainer>
        })
    return (<>
        <Header onFilter = {filter}></Header>
        <div className="movies">
            {movieContainerList}
        {}</div>
    </>)
}

export default App;