import Joke from "./Joke";
import useGetJokes from "./hooks/useGetJokes";
import "./JokeList.css";

/** List of jokes. */
const JokeList = ({ numJokesToGet = 5 }) => {
  const [jokes, isLoading, getJokes, changeVote] = useGetJokes(numJokesToGet);

  const generateNewJokes = () => {
    getJokes();
  };

  console.log(jokes);

  const loadJokes = isLoading ? (
    <div className="loading">
      <i className="fas fa-4x fa-spinner fa-spin" />
    </div>
  ) : (
    <div className="JokeList">
      <button className="JokeList-getmore" onClick={generateNewJokes}>
        Get New Jokes
      </button>

      {jokes.map((j) => (
        <Joke
          text={j.joke}
          key={j.id}
          id={j.id}
          votes={j.votes}
          vote={changeVote}
        />
      ))}
    </div>
  );

  return loadJokes;
};

export default JokeList;
