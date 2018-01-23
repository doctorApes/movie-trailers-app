import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';
import YTSearch from 'youtube-api-search';

import Header from './Components/header';
import VideoBox from './Components/video-box';
import DescriptionBox from './Components/description-box';
import MovieTitle from './Components/movie-title';
import ActorsList from './Components/actors-list';
import ReviewsBox from './Components/reviews-box';
import RecommendationsBox from './Components/Recommendations-box';
import Footer from './Components/footer';

const API_KEY = 'b75fae778d68850454ff779b6948316d';
const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

const YT_API_KEY = "AIzaSyD61CjvJT70hzIHttTTy305OjppbG_s7Dg";



class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: [],
      reviews: [],
      trailer: null
    };

    this.getData();
    this.videoSearch('the godfather trailer');

  }

  getData(){
    const url = `${URL}&query=the+godfather&append_to_response=reviews`;      
      Axios.get(url)
        .then((response) => {
          console.log(response);        
          this.setState({                 
            data: response.data.results[0]
          });
      });           
  }

  videoSearch(term) {
    YTSearch({key: YT_API_KEY, term: term}, (videos) => {
        this.setState({             
            trailer: videos[0]
         });            
    });      
  }

  render() {
    return (
      <div className="App">        
        <Header />
        <MovieTitle data={this.state.data}/>
        <VideoBox trailer={this.state.trailer}/>
        <DescriptionBox data={this.state.data}/>
        <ActorsList data={this.state.data}/> 
        <ReviewsBox data={this.state.data}/>  
        <RecommendationsBox data={this.state.data}/>  
        <Footer />           
      </div>
    );
  }
}

export default App;
