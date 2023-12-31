import React, { useEffect } from "react";
import { newsArticles } from "../Constants";

const News = () => {
  return (
    <div className=" mt-16 mx-12 mb-10">
        <hr className="w-[92vw] mb-12" />

      <h2 className="mb-5 text-2xl font-bold"><span className="text-red-600">Cyber</span> News:</h2>
      <div className="flex items-start justify-between gap-5">
        {newsArticles.map((article, i) => {
          return (
            <div key={i} className="cursor-pointer">
              <img src={article.thumbnail} width={"1080px"} height={"1080px"} />
              <h2 className="font-bold text-[15px] mt-2 mb-2">
                {article.title}
              </h2>
              <p className="text-sm text-gray-500">
                {article.shortDescription}
              </p>
              <button className="py-2 px-3 mt-2 rounded-xl border-[2px] border-transparent transition-all ease-in hover:rounded-2xl hover:border-yellow-400 hover:bg-transparent hover:scale-90 bg-yellow-400">
                Read More
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default News;
