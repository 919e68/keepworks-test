import React from 'react'
import { Query } from 'react-apollo'
import { Movie, Movies } from 'shared/Movies'
import AllMovies from 'graphql/queries/AllMovies.gql'

const Home = () => (
  <div className="container">
    <h1 className="title">Movies</h1>

    <Query query={AllMovies} >
      {({ data, loading, error }) => {
        if (loading || error) {
          return null
        }

        const { movies, user } = data

        return (
          <Movies>
            {movies.map(movie => (
              <Movie
                key={`movie-${movie.id}`}
                movie={movie}
                user={user}
              />
            ))}
          </Movies>
        )
      }}
    </Query>
  </div>
)

export default Home
