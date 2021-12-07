export interface Shipment {
  id: string;
  name: string;
  email: string;
  boxes: string;
}

export const getShipments = async (): Promise<Shipment[]> => {
  try {
    const response = await fetch(`${window.location.origin}/shipments.json`);
    const data: Shipment[] = await response.json();
    return data;
  } catch (error) {
    Promise.reject(new Error("Error while fetching shipments"));
  }

  return [];
};
