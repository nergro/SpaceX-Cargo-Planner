import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import { Navbar } from "../../components/layout/Navbar";
import { Main } from "../../components/layout/Main";
import { Spinner } from "../../components/spinner/Spinner";
import { getShipments, Shipment } from "../../api/shipments";

import s from "./Home.module.css";

interface Params {
  shipmentId?: string;
}

export const Home = () => {
  const params: Params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [search, setSearch] = useState("");
  const initialShipments = useRef<Shipment[]>([]);

  const fetchShipments = async () => {
    const shipments = await getShipments();
    setShipments(shipments);
    initialShipments.current = shipments;
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetchShipments();
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className={s.container}>
        <Spinner />
      </div>
    );
  }

  const onSearchChange = (value: string) => {
    setSearch(value);
    if (!value) {
      setShipments(initialShipments.current);
    } else {
      const filteredShipments = initialShipments.current.filter((x) =>
        x.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
      setShipments(filteredShipments);
    }
  };

  return (
    <div className={s.container}>
      <Header
        search={search}
        onSearchChange={(value) => onSearchChange(value)}
        shipments={shipments}
        activeLink={params.shipmentId || ""}
      />
      <Navbar shipments={shipments} activeLink={params.shipmentId || ""} />
      <Main shipments={shipments} shipmentId={params.shipmentId || ""} />
    </div>
  );
};
