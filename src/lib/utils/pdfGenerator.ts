/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flight } from "@/lib/convertToIFlight";
import jsPDF from "jspdf";

interface TicketData {
  bookingReference: string;
  flight: Flight;
  passengers: any[];
  totalPrice: number;
  bookingDate: string;
}

export const generateTicketPDF = (ticketData: TicketData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  // Colors
  const primaryBlue = [59, 130, 246];
  const secondaryGreen = [34, 197, 94];
  const darkGray = [55, 65, 81];
  const lightGray = [156, 163, 175];

  // Header with logo area
  doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
  doc.rect(0, 0, pageWidth, 50, "F");

  // Company name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("KHUYENDU", 20, 25);

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("Travel Booking Platform", 20, 35);

  // E-Ticket label
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("E-TICKET", pageWidth - 60, 25);

  // Booking Reference Box
  doc.setFillColor(240, 240, 240);
  doc.rect(20, 60, pageWidth - 40, 25, "F");
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(`Booking Reference: ${ticketData.bookingReference}`, 25, 75);

  // Flight Information Section
  let yPos = 100;
  doc.setTextColor(secondaryGreen[0], secondaryGreen[1], secondaryGreen[2]);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("FLIGHT INFORMATION", 20, yPos);

  // Flight details in two columns
  yPos += 15;
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  // Left column
  doc.text(`Airline: ${ticketData.flight.airline_name}`, 20, yPos);
  doc.text(`Flight: ${ticketData.flight.flightNumber}`, 20, yPos + 12);
  doc.text(`Class: ${ticketData.flight.class}`, 20, yPos + 24);
  doc.text(`Duration: ${ticketData.flight.duration}`, 20, yPos + 36);

  // Right column
  doc.text(`Aircraft: ${ticketData.flight.equipmenttext}`, 120, yPos);
  doc.text(`Stops: ${ticketData.flight.stops}`, 120, yPos + 12);
  doc.text(`Status: CONFIRMED`, 120, yPos + 24);

  // Route Information with visual elements
  yPos += 60;
  doc.setTextColor(secondaryGreen[0], secondaryGreen[1], secondaryGreen[2]);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("ROUTE DETAILS", 20, yPos);

  yPos += 20;
  // Departure box
  doc.setFillColor(249, 250, 251);
  doc.rect(20, yPos, 70, 40, "F");
  doc.setDrawColor(229, 231, 235);
  doc.rect(20, yPos, 70, 40, "S");

  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("DEPARTURE", 25, yPos + 10);
  doc.setFont("helvetica", "normal");
  doc.text(ticketData.flight.departure.airport, 25, yPos + 20);
  doc.text(ticketData.flight.departure.date, 25, yPos + 28);
  doc.text(ticketData.flight.departure.time, 25, yPos + 36);

  // Arrow
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.setFontSize(16);
  doc.text("→", 100, yPos + 25);

  // Arrival box
  doc.setFillColor(249, 250, 251);
  doc.rect(110, yPos, 70, 40, "F");
  doc.setDrawColor(229, 231, 235);
  doc.rect(110, yPos, 70, 40, "S");

  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("ARRIVAL", 115, yPos + 10);
  doc.setFont("helvetica", "normal");
  doc.text(ticketData.flight.arrival.airport, 115, yPos + 20);
  doc.text(ticketData.flight.arrival.date, 115, yPos + 28);
  doc.text(ticketData.flight.arrival.time, 115, yPos + 36);

  // Passenger Information
  yPos += 60;
  doc.setTextColor(secondaryGreen[0], secondaryGreen[1], secondaryGreen[2]);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("PASSENGER DETAILS", 20, yPos);

  yPos += 15;
  ticketData.passengers.forEach((passenger, index) => {
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 30;
    }

    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(
      `${index + 1}. ${passenger.title} ${passenger.firstName} ${
        passenger.lastName
      }`,
      20,
      yPos
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Type: ${passenger.type.toUpperCase()}`, 25, yPos + 8);
    doc.text(`DOB: ${passenger.dateOfBirth}`, 25, yPos + 16);
    doc.text(`Gender: ${passenger.gender}`, 100, yPos + 8);
    if (passenger.passportNumber) {
      doc.text(`Passport: ${passenger.passportNumber}`, 100, yPos + 16);
    }

    yPos += 25;
  });

  // Price Summary Box
  yPos += 10;
  doc.setFillColor(249, 250, 251);
  doc.rect(120, yPos, 70, 50, "F");
  doc.setDrawColor(229, 231, 235);
  doc.rect(120, yPos, 70, 50, "S");

  doc.setTextColor(secondaryGreen[0], secondaryGreen[1], secondaryGreen[2]);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("PRICE SUMMARY", 125, yPos + 12);

  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Base Price: $${ticketData.flight.price}`, 125, yPos + 22);
  doc.text(`Passengers: ${ticketData.passengers.length}`, 125, yPos + 30);
  doc.setFont("helvetica", "bold");
  doc.text(`Total: $${ticketData.totalPrice}`, 125, yPos + 42);

  // Important Information
  yPos += 70;
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("IMPORTANT INFORMATION:", 20, yPos);
  doc.text(
    "• Please arrive at the airport at least 2 hours before departure",
    20,
    yPos + 10
  );
  doc.text(
    "• This is an electronic ticket. Present this document and valid ID at check-in",
    20,
    yPos + 18
  );
  doc.text("• Check-in opens 24 hours before departure", 20, yPos + 26);
  doc.text("• Baggage allowance: 23kg checked, 7kg carry-on", 20, yPos + 34);

  // Footer
  doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
  doc.rect(0, pageHeight - 30, pageWidth, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text(
    "Khuyendu Travel - Your trusted travel partner",
    20,
    pageHeight - 20
  );
  doc.text(
    "Contact: +1-202-555-0174 | support@khuyendu.com",
    20,
    pageHeight - 12
  );
  doc.text(`Generated: ${new Date().toLocaleString()}`, 20, pageHeight - 4);

  // QR Code placeholder (you can integrate a QR code library later)
  doc.setDrawColor(200, 200, 200);
  doc.rect(pageWidth - 50, pageHeight - 50, 30, 30, "S");
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.setFontSize(6);
  doc.text("QR CODE", pageWidth - 42, pageHeight - 32);

  return doc;
};
