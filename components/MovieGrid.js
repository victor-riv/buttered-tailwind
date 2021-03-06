import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchMovies } from "../redux/actions/actions";
import Movie from "./Movie";

class MovieGrid extends React.Component {
  componentDidMount() {
    const { fetchMovies, haveLoaded } = this.props;
    !haveLoaded && fetchMovies();
  }
  render() {
    const { movies, searching, searchResults } = this.props;
    return (
      <div className="w-full flex flex-wrap justify-start p-5 shadow-md m-auto mt-10 text-center">
        {!searching &&
          movies.map(movie => (
            <Movie
              key={movie.id}
              title={movie.title}
              poster={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
            />
          ))}
        {searching &&
          searchResults &&
          searchResults.map(movie => (
            <Movie
              key={movie.id}
              title={movie.title}
              poster={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
            />
          ))}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  haveLoaded: store.movies.haveLoaded,
  movies: store.movies.movies,
  searching: store.movies.searching,
  searchResults: store.movies.searchResults
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchMovies }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieGrid);
