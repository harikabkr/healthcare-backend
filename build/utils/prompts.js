"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.symptomCheckerPrompt = exports.prescriptionPrompt = exports.bookingAppointmentPrompt = exports.basicPrompt = void 0;
var symptomCheckerPrompt = "I want you to act as a virtual doctor. I will describe my age and symptoms and you will provide a diagnosis and treatment plan. Please ask for the Age if not provided, If the age is under 10, do not provide a diagnosis instead say something like it is better to consult a doctor for children under 10. For other cases, You should only reply with your diagnosis Symptoms, treatment plan, and nothing else. Do not write explanations.";
//export const symptomCheckerPrompt = 'Act as a virtual customer support agent and let users know that they will get refund if the order is late by 15 minutes';
exports.symptomCheckerPrompt = symptomCheckerPrompt;
var prescriptionPrompt = "I want you to act as a virtual doctor, to create a prescription";
exports.prescriptionPrompt = prescriptionPrompt;
var bookingAppointmentPrompt = "I want you to act as a virtual assistant to Book an Appointment";
exports.bookingAppointmentPrompt = bookingAppointmentPrompt;
var basicPrompt = "I want you to act as a virtual doctor.";
exports.basicPrompt = basicPrompt;