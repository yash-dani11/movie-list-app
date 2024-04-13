import {useState,useEffect} from 'react';
import { currentYear,defaultYearInView } from './constants';
const useInfiniteScroll = (upScrollElement,downScrollElement) => {
    const [movieYears,setMovieYears] = useState([defaultYearInView-1,defaultYearInView,defaultYearInView+1]);
    useEffect(()=>{
        if(upScrollElement && downScrollElement){
            const infinteScrollUpObserver = new IntersectionObserver((entries)=>infiniteScrollCallback(entries,-1),{threshold:0.2});
            infinteScrollUpObserver.observe(upScrollElement);
            const infinteScrollDownObserver = new IntersectionObserver((entries)=>infiniteScrollCallback(entries,1),{threshold:0.2});
            infinteScrollDownObserver.observe(downScrollElement);
            function infiniteScrollCallback(entries,scrollDirection){
                entries.forEach((entry)=>{
                    if(entry.isIntersecting){
                        setMovieYears(prev=>{
                            const prevYear = prev[0]-1;
                            const nextYear = prev[prev.length-1]+1;
                            let updatedYears = [...prev];
                            if(prevYear>=1950 && scrollDirection===-1){
                                updatedYears.unshift(prevYear);
                            }
                            else if(nextYear<=currentYear && scrollDirection===1){
                                updatedYears.push(nextYear);
                            }
                            infinteScrollUpObserver.disconnect();
                            infinteScrollDownObserver.disconnect();
                            return updatedYears;
                        })
                    }
                })
            }
        }
        
    },[movieYears]);
    return movieYears;
}

export default useInfiniteScroll;