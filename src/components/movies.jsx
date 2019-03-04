import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = movie => {
    const newMovies = this.state.movies.filter(mv => mv.title !== movie.title);
    this.setState({
      movies: newMovies
    });
  };

  handleLike = movie => {
    const newMovies = [...this.state.movies];
    const index = newMovies.indexOf(movie);
    // newMovies[index] = { ...newMovies[index] };
    newMovies[index].liked = !newMovies[index].liked;

    this.setState({ movies: newMovies });
  };
  getMovieRows() {
    return this.state.movies.map(movie => {
      return (
        <tr key={movie._id}>
          <td>{movie.title}</td>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>
          <td>
            <Like onClick={() => this.handleLike(movie)} liked={movie.liked} />
          </td>
          <td>
            <button
              onClick={() => this.handleDelete(movie)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { length: moviesCount } = this.state.movies;
    if (moviesCount === 0) {
      return <p>There are no movies in the database.</p>;
    }
    return (
      <React.Fragment>
        <p>Showing {moviesCount} movies from the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>{this.getMovieRows()}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
