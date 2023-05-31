import React, { useEffect } from "react";
import { themeChange } from "theme-change";
import ThemeList from "./ThemeList";

type Props = {};

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

const Theme = (props: Props) => {
  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost border-gray-200 p-3 m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </label>
      <div className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-[70vh] w-52 overflow-y-auto shadow-2xl mt-16 overflow-auto scrollbar-thin scrollbar-thumb-zinc-800">
        <div className="grid grid-cols-1 gap-3 p-3 " tabIndex={0}>
          {themes.map((theme, index) => (
            <ThemeList theme={theme} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Theme;
