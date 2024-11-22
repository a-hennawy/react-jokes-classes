import { useState, useEffect } from "react";

import axios from "axios";

const useGetJokes = (numJokesToGet) => {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getJokes() {
    try {
      setIsLoading(true);
      let seenJokes = new Set();
      let jokesArray = [];

      while (jokesArray.length < numJokesToGet) {
        // console.log("Jokes before req:", jokes.length);
        console.log(seenJokes);
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" },
        });
        let resJoke = res.data;
        if (!seenJokes.has(resJoke.id)) {
          seenJokes.add(resJoke.id);
          jokesArray.push({ ...resJoke, votes: 0 });
        } else {
          console.log("DUPLICATION FOUND!!");
        }
      }

      setJokes(jokesArray);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getJokes();
  }, []);

  const changeVote = (id, delta) => {
    const votedJokes = jokes.map((joke) =>
      joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
    );
    let sortedVotedJokes = [...votedJokes].sort((a, b) => b.votes - a.votes);
    setJokes(sortedVotedJokes);
  };
  return [jokes, isLoading, getJokes, changeVote];
};

export default useGetJokes;
