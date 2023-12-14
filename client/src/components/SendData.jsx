import { useState } from "react";
import axios from "axios";

function SendData() {
  let [data, setData] = useState({ name: "" });

  const sendData = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/testing/data/send", data);
      console.log("Data sent to route successfully");
    } catch (e) {
      console.error("Error:", e);
    }
  };

  return (
    <>
      <br />
      <form action={sendData}>
        <input
          type="text"
          name="name"
          id="name"
          onChange={setData((e) => {
            name: e.target.value;
          })}
        />
        <button type="submit">Submit!!!</button>
      </form>
    </>
  );
}

export default SendData;
