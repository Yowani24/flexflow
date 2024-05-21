// src/services/speechService.js
import axios from "axios";

const API_URL = "http://localhost:3001/speech";

const startTranscription = async () => {
  try {
    const response = await axios.get(`${API_URL}/transcribe`);
    return response.data;
  } catch (error) {
    console.error("Error starting transcription:", error);
    throw error;
  }
};

export default {
  startTranscription,
};

// src/components/speechService.js
// import axios from "axios";

// const API_URL = "http://localhost:3001/speech";

// const startTranscription = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/transcribe`);
//     return response.data;
//   } catch (error) {
//     console.error("Error starting transcription:", error.message);
//     if (error.response) {
//       console.error(
//         "Server Response:",
//         error.response.status,
//         error.response.data
//       );
//     } else if (error.request) {
//       console.error("No response received:", error.request);
//     } else {
//       console.error("Error setting up request:", error.message);
//     }
//     throw error;
//   }
// };

// export default {
//   startTranscription,
// };
