import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <main className="flex flex-col items-center">
      <div className="mt-14">
        <img src="/images/chat.png" alt="" width={40} />
      </div>
      <Link to={"/"} className="w-full  ">
        <div className="flex bg-white w-full  p-2 mt-12 gap-2 items-center cursor-pointer hover:bg-[#49a4dd] hover:text-white transition   ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 ml-2 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>

          <p className="text-lg ">Flows</p>
        </div>
      </Link>
    </main>
  );
};

export default Sidebar;
