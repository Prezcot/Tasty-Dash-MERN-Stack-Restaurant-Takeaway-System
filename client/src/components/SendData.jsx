import { useState } from "react";
import axios from "axios";

function SendData() {
  let [data, setData] = useState({ name: "" });

  const sendData = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/testing/data/send", data)
      .then(() => {
        console.log("Data has been sent succefully");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <>
      <br />
      <form onSubmit={sendData}>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => {
            setData({ name: e.target.value });
          }}
        />
        <button type="submit">Submit!!!</button>
      </form>
    </>
  );
}

export default SendData;
