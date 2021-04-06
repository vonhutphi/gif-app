import React, { useMemo, useState, useEffect } from "react";
import "./Gif.css";
import axios from "axios";
export default function GIFTRENDING() {
  const GIF_LIMIT = 50;
  const [data, setData] = useState(null);
  const [gif, setGif] = useState();
  let [showMore, setShowMore] = useState(1);
  let numberOfItems = showMore * 12;

  useEffect(() => {
    axios({
      url:
        "https://api.giphy.com/v1/gifs/trending?api_key=CmfrK4HrPwfRbYvP9F79pvsgFJm0Vip6&limit=50&rating=g",
      method: "GET",
    })
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderGif = useMemo(() => {
    return (
      data &&
      data.data.slice(0, numberOfItems).map((item, index) => {
        return (
          <div
            key={index}
            className="gifItem col-6 col-md-4 col-lg-3 mb-3"
            onClick={() => setGif(item.images.original.webp)}
          >
            <img
              className="gif"
              src={item.images.original.webp}
              //   style={{ width: "100%", height: "150px" }}
              alt=""
            />
            <div
              className="gifTitle"
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                lineHeight: "2rem",
              }}
            >
              {item.title}
            </div>
          </div>
        );
      })
    );
  }, [numberOfItems, data]);
  return (
    <div className="gifMain pt-5 pb-5">
      <div className="container p-0">
        <div className="title text-center trending mb-3">Giphy Trending</div>
        <div className="gifContent row m-0" style={{ width: "100%" }}>
          {renderGif}
        </div>
        <div className="ShowMore">
          <button
            style={{
              display: `${showMore * 12 > GIF_LIMIT ? "none" : "block"}`,
              margin: "auto",
            }}
            className="btn btnShowMore"
            onClick={() => {
              setShowMore((showMore += 1));
            }}
          >
            Show More
          </button>
        </div>
        {gif && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(0, 0, 0, .8)",
            }}
            onClick={(e) => {
              e.preventDefault();
              setGif(undefined);
            }}
          >
            <img src={gif} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}
