"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPromptFromSelectedFeature = void 0;
var _prompts = require("./prompts");
var getPromptFromSelectedFeature = function getPromptFromSelectedFeature(selectedFeature) {
  switch (selectedFeature.toLowerCase()) {
    case 'symptom_check':
      return _prompts.symptomCheckerPrompt;
    case 'prescription':
      return _prompts.prescriptionPrompt;
    case 'booking':
      return _prompts.bookingAppointmentPrompt;
    default:
      return _prompts.basicPrompt;
  }
};
exports.getPromptFromSelectedFeature = getPromptFromSelectedFeature;