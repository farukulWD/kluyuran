import { IFlight } from "@/store/features/searchSlice";
import { format } from "date-fns";

export interface Flight {
  id: string;
  airline_name: string;
  salecurrencycode: string;
  equipmenttext: string;
  airline_logo: string;
  refundable: boolean;
  baggage_details: string;
  departure: {
    time: string;
    airport: string;
    date: string;
  };
  arrival: {
    time: string;
    airport: string;
    date: string;
  };
  duration: string;
  stops: string;
  flightNumber: string;
  class: string;
  price: number;
}

export function convertToIFlight(data: IFlight[]): Flight[] {
  return data.map((item) => {
    const flight = item.itin_details[0].flight_data[0];

    const departureDate = new Date(flight.departuredate);
    const arrivalDate = new Date(flight.arrivaldate);

    const formatTime = (date: Date) =>
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

    return {
      id: item.resultid,
      baggage_details: flight.baggage_details,
      pax_baggage: flight.pax_baggage.adult,
      airline_name: flight.airline_name,
      equipmenttext: flight.equipmenttext,
      salecurrencycode: item.salecurrencycode,
      airline_logo: flight.air_logo,
      refundable: true,
      departure: {
        time: formatTime(departureDate),
        airport: flight.origincode,
        date: formatDate(departureDate),
      },
      arrival: {
        time: formatTime(arrivalDate),
        airport: flight.destinationcode,
        date: formatDate(arrivalDate),
      },
      duration: `${Math.floor(flight.duration / 60)}h ${
        flight.duration % 60
      }min`,
      stops:
        item.itin_details[0].layover > 0
          ? `${item.itin_details[0].layover} Stop(s)`
          : "Non Stop",
      flightNumber: flight.flight_name,
      class: "Business Class",
      price: item.price_info.total,
    };
  });
}
