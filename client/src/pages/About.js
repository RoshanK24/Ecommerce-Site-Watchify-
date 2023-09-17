import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-7 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%", height: "80vh" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 mt-2 text-white text-center">About</h1>
          <p className="text-justify mt-2 justify-content-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;