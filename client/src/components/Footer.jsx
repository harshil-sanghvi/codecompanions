import React from "react";
import { AiOutlineGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="w-full p-[2px] mt-auto flex flex-col items-center gap-2 justify-center mx-0 bottom-5 text-center z-50 bg-[#431407] text-white h-20">
      <div>
        <span>
          Made by{" "}
          <a
            href="https://www.linkedin.com/in/umang-goenka-1622b01a3/"
            rel="noreferrer"
            target="_blank"
            className="text-blue-400 hover:underline"
          >
            Umang Goenka
          </a>{" "}
          and{" "}
          <a
            href="https://www.linkedin.com/in/harshilsanghvi/"
            rel="noreferrer"
            target="_blank"
            className="text-blue-400 hover:underline"
          >
            Harshil Sanghvi
          </a>
        </span>
      </div>
      <div>
        Check out the code on{" "}
        <a
          href="https://github.com/harshil-sanghvi/codecompanions"
          rel="noreferrer"
          target="_blank"
          className="text-blue-400 hover:underline"
        >
          GitHub
          <AiOutlineGithub className="cursor-pointer inline-block ml-1" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
