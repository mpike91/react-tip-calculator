import { useState } from "react";

import "./styles.css";

const initialService = { 0: 0, 1: 0 };

function App() {
  const [bill, setBill] = useState(100);
  const [service, setService] = useState(initialService);

  function handleChangeService(id, value) {
    setService((s) => ({ ...s, [id]: Number(value) }));
  }

  function handleReset() {
    setBill(100);
    setService(initialService);
  }

  return (
    <div>
      <Bill bill={bill} setBill={setBill} />
      <Service
        id={0}
        service={service}
        handleChangeService={handleChangeService}
      >
        <span>How did you like the service?</span>
      </Service>
      <Service
        id={1}
        service={service}
        handleChangeService={handleChangeService}
      >
        <span>How did your friend like the service?</span>
      </Service>
      <Payment bill={bill} service={service} />
      <Button handleReset={handleReset}>Reset</Button>
    </div>
  );
}

function Bill({ bill, setBill }) {
  return (
    <div>
      <label>
        <span>How much was the bill? </span>
        <input
          type="text"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        />
      </label>
    </div>
  );
}

function Service({ id, service, handleChangeService, children }) {
  return (
    <div>
      <span>{children} </span>
      <select
        value={service[id]}
        onChange={(e) => handleChangeService(id, e.target.value)}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Payment({ bill, service }) {
  const values = Object.values(service);
  const average = values.reduce((acc, el) => acc + el, 0) / values.length;
  const tip = Math.round((bill * average) / 10) / 10;
  return (
    <div>
      <h3>
        You pay ${bill + tip} (${bill} + ${tip} tip)
      </h3>
    </div>
  );
}

function Button({ handleReset, children }) {
  return (
    <div>
      <button onClick={handleReset}>{children}</button>
    </div>
  );
}

export default App;
