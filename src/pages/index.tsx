import { NextPage } from "next";
import { trpc } from "@/utils/trpc";

const Home: NextPage = () => {
  const { data } = trpc.useQuery(["hello", { text: "Come On Man" }]);

  if (!data) {
    return <div>Loading.....</div>;
  }

  return <div>{data.greeting}</div>;

  // return (
  //   <div className="h-screen w-screen flex flex-col justify-center items-center">
  //     <div className="text-2xl text-center">Which Pokémon is roundest ?</div>
  //     <div className="p-2" />
  //     <div className="border rounded p-8 flex justify-between max-w-2xl">
  //       <div className="w-32 h-32 bg-red-50" />
  //       <div className="p-8">Vs</div>
  //       <div className="w-32 h-32 bg-red-50" />
  //     </div>
  //   </div>
  // );
};

export default Home;
