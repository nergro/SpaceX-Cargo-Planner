import { useState, useEffect, useMemo } from "react";
import { Shipment } from "../../api/shipments";
import { Input } from "../inputs/Input";

import s from "./Main.module.css";

const CARGO_BAY_CAPACITY = 10;

const calculateCargoBays = (boxes: string) => {
  if (!boxes) {
    return null;
  }

  const sum = boxes.split(",").reduce((sum, value) => {
    const valueNum = +value;
    return isNaN(valueNum) ? sum : sum + valueNum;
  }, 0);

  return Math.ceil(sum / CARGO_BAY_CAPACITY);
};

interface Props {
  shipments: Shipment[];
  shipmentId: string;
}

export const Main = ({ shipments, shipmentId }: Props) => {
  const [boxes, setBoxes] = useState("");
  const [error, setError] = useState("");

  const activeShipment = shipments.find((x) => x.id === shipmentId);

  useEffect(() => {
    if (activeShipment) {
      setBoxes(activeShipment.boxes);
    }
  }, [activeShipment]);

  const requiredCargoBays = useMemo(() => calculateCargoBays(boxes), [boxes]);

  if (!shipments.length) {
    return (
      <main className={s.main}>
        <div className={s.notFound}>
          <p>No shipments found</p>
        </div>
      </main>
    );
  }

  if (!activeShipment) {
    return (
      <main className={s.main}>
        <div className={s.notFound}>
          <p>Please select a shipment</p>
        </div>
      </main>
    );
  }

  const onInputChange = (value: string) => {
    setBoxes(value);
    const nums = value.split(",");
    const hasInvalidNumber = nums.some((x) => isNaN(+x));
    const isNotInRange = nums.some((x) => {
      const valueNum = +x;
      return valueNum < 0 || valueNum > 10;
    });

    if (hasInvalidNumber) {
      return setError("Please enter numbers separated by a comma.");
    }
    if (isNotInRange) {
      return setError("Cargo must not weight more than 10");
    }

    setError("");
  };

  return (
    <main className={s.main}>
      <p className={s.name}>{activeShipment.name}</p>
      <p>{activeShipment.email}</p>
      <div className={s.inputContainer}>
        <p className={s.inputLabel}>CARGO BOXES</p>
        <Input
          className={s.input}
          value={boxes}
          onChange={(value) => onInputChange(value)}
        />
        {error && <p className={s.error}>{error}</p>}
      </div>
      {requiredCargoBays && !error ? (
        <div className={s.requiredBoxes}>
          <p className={s.requiredBoxesLabel}>Number of required cargo bays</p>
          <p className={s.requiredBoxesNumber}>{requiredCargoBays}</p>
        </div>
      ) : null}
    </main>
  );
};
