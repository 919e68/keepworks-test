import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Movie = ({ movie, user }) => (
  <div className="movie">
    <div className="movie-inner">
      <h4 className="movie-title">
        {movie.title}
      </h4>
      <div className="movie-date">
        <div className="title">Showing Date</div>
        <div className="date">
          <span>
            {moment(movie.showingStart).format('MMM DD, YYYY')}
          </span>
          <span> - </span>
          <span>
            {moment(movie.showingEnd).format('MMM DD, YYYY')}
          </span>
        </div>
      </div>
      {movie.canBook ? (
        user ? (
          <Link to={user ? `/movie/${movie.id}` : `/login`} className="button primary block">
            Book Now!
          </Link>
        ) : (
          <a
            href="/login"
            className="button primary block"
          >
          Login to Book Now
          </a>
        )
      ) : (
        <div className="button gray block">
          Not Available
        </div>
      )}
    </div>
  </div>
)

export default Movie
