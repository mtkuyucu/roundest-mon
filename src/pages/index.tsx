import { NextPage } from "next";
import { getOptionsForVote } from "@/utils/getRandomPokemen";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [options, setOptions] = useState(false);
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);

  useEffect(() => {
    let optionsForVote = getOptionsForVote();
    setOptions(optionsForVote);
    setFirst(optionsForVote[0]);
    setSecond(optionsForVote[1]);
  }, []);

  if (!options) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokémon is roundest ?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl">
        <div className="w-32 h-32 bg-red-50">{first}</div>
        <div className="p-8">Vs</div>
        <div className="w-32 h-32 bg-red-50">{second}</div>
      </div>
    </div>
  );
};

export default Home;
