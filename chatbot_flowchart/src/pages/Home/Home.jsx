// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import useFlow from "@/hooks/useFlow";
import PostFlow from "@/components/PostFlow";
import FlowCard from "@/components/FlowCard";

const Home = () => {
  const { state } = useFlow();

  const flows = state?.flows;
  if (!flows) return "Loading..";

  return (
    <main className="min-h-[100vh]">
      <div className="pt-14 pb-11 border-b-2 border-b-gray-100   ">
        <h1 className="text-4xl font-bold text-center text-blue-500 ">
          Welcome to Flow Builder
        </h1>
        <p className="text-center text-gray-500 text-lg mt-5">
          Here you can create and manage your flows. Click on the Create button
          to get started
        </p>
      </div>
      <div className="m-10">
        <div className="flex justify-between  ">
          <h1 className="">Flows</h1>
          <PostFlow />
        </div>
        <div className="mt-3">
          {flows.length === 0 && (
            <div className="flex justify-center items-center">
              <h1 className="mt-20 tex">
                Looks a bit empty here, click create to get started
              </h1>
            </div>
          )}
          {flows.map((flow) => (
            <div key={flow.id} className="mb-3">
              <FlowCard flow={flow} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
