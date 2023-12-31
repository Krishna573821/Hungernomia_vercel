import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch("https://gofood-steel.vercel.app/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    // console.log(response[0],response[1])
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="hero-container position-relative w-100">
        <div className="position-absolute top-0 start-0 w-100">
          <Navbar />
        </div>
        <video
          className="position-absolute top-0 start-0 w-100"
          autoPlay
          loop
          muted
          src="Videos/herovideo.mp4"
        ></video>
        <div
          className="position-absolute bottom-0 start-50 translate-middle-x mb-4"
          style={{ zIndex: "1", width: "60%" }}
        >
          <h1 className="mb-2 text-white">Text Line 1</h1>
          <h2 className="mb-5 text-white">Text Line 2</h2>
          <input
            className="form-control me-2 bg-white text-dark"
            type="search"
            placeholder="Search in here..."
            aria-label="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="m-3">
        <div className="container">
          {foodCat !== []
            ? foodCat.map((data) => {
                return (
                  // justify-content-center
                  <div className="row mb-3">
                    <div key={data._id} className="fs-3 m-3">
                      {data.CategoryName}
                    </div>
                    <hr
                      id="hr-success"
                      style={{
                        height: "2px",
                        backgroundImage:
                          "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
                      }}
                    />
                    {foodItem !== [] ? (
                      foodItem
                        .filter(
                          (items) =>
                            items.CategoryName === data.CategoryName &&
                            items.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                        )
                        .map((filterItems) => {
                          return (
                            <div
                              key={filterItems.id}
                              className="col-12 col-md-6 col-lg-3"
                            >
                              {/* {console.log(filterItems.url)} */}
                              <Card
                                foodItem={filterItems}
                                // item={filterItems}
                                options={filterItems.options[0]}
                                // imgSrc={filterItems.img}
                              />
                            </div>
                          );
                        })
                    ) : (
                      <div> No Such Data </div>
                    )}
                  </div>
                );
              })
            : ""}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}
