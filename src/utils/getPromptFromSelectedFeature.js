import { basicPrompt, bookingAppointmentPrompt, prescriptionPrompt, symptomCheckerPrompt } from "./prompts";

export const getPromptFromSelectedFeature = (selectedFeature) => {
    switch (selectedFeature.toLowerCase()) {
        case 'symptom_check':
            return symptomCheckerPrompt;
        case 'prescription':
            return prescriptionPrompt;
        case 'booking':
            return bookingAppointmentPrompt;
        default:
            return basicPrompt;
    }
}