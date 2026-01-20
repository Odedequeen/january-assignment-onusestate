
import React, { useReducer, useEffect, useCallback } from "react";

/* ---------------- INITIAL STATE ---------------- */
const initialState = {
  genre: "",
  mood: "",
  level: "",
  responses: [],
  loading: false,
  error: null,
};

/* ---------------- REDUCER ---------------- */
function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };

    case "START_FETCH":
      return { ...state, loading: true, error: null };

    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        responses: [...state.responses, action.payload],
      };

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

/* ---------------- COMPONENT ---------------- */
export default function LandingPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { genre, mood, level, responses, loading, error } = state;

  /* ---------------- DATA ---------------- */
  const listOfMoodOption = {
    Fiction: ["Happy", "Sad", "Adventurous"],
    NonFiction: ["Curious", "Motivated"],
  };

  const availableMoodBasedOnGenre = listOfMoodOption[genre] || [];

  /* ---------------- CALLBACK ---------------- */
  const fetchRecommendations = useCallback(async () => {
    if (!genre || !mood || !level) return;

    dispatch({ type: "START_FETCH" });

    try {
      const GEMINI_API_KEY = "YOUR_API_KEY_HERE";

      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" +
          GEMINI_API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Recommend 6 books for a ${level} ${genre} reader feeling ${mood}. Explain why.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      dispatch({
        type: "FETCH_SUCCESS",
        payload: data.candidates?.[0]?.content?.parts?.[0]?.text || "No response",
      });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  }, [genre, mood, level]);

  /* ---------------- EFFECT ---------------- */
  useEffect(() => {
    if (genre) {
      dispatch({ type: "SET_FIELD", field: "mood", value: "" });
    }
  }, [genre]);

  /* ---------------- UI ---------------- */
  return (
    <div>
      <h1>Book Recommendation App</h1>

      <button onClick={fetchRecommendations} disabled={loading}>
        {loading ? "Loading..." : "Get AI Recommendation"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {responses.map((res, index) => (
        <p key={index}>{res}</p>
      ))}
    </div>
  );
}




// import React from "react";




// export default function LandingPage() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const { genre, mood, level, responses, loading, error } = state;

//   const listOfMoodOption = {
//     Fiction: ["Happy", "Sad", "Adventurous"],
//     NonFiction: ["Curious", "Motivated"],
//   };
//   const availableMoodBasedOnGenre = listOfMoodOption[genre] || [];


// export default function LandingPage() {
//   const [genre, setGenre] = React.useState("");
//   const [mood, setMood] = React.useState("");
//   const [level, setLevel] = React.useState("");
//   const [aiResponses, setAiResponses] = React.useState([]);

//   // example moods list (make sure this exists)
//   const listOfMoodOption = {
//     Fiction: ["Happy", "Sad", "Adventurous"],
//     NonFiction: ["Curious", "Motivated"],
//   };

//   const availableMoodBasedOnGenre = listOfMoodOption[genre] || [];

//   const getRecommendation = () => {
//     setAiResponses((prev) => [
//       ...prev,
//       `Genre: ${genre}, Mood: ${mood}, and Level: ${level}`,
//     ]);
//   };

//   const fetchRecommendations = async () => {
//     if (!genre || !mood || !level) return;

//     try {
//       const GEMINI_API_KEY = "AIzaSyAaitFnIuiRbEjr7EcmMq9Ieg5LQJzAs2I";

//       const response = await fetch(
//         "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" +
//           GEMINI_API_KEY,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             contents: [
//               {
//                 parts: [
//                   {
//                     text: `Recommend 6 books for a ${level} ${genre} reader feeling ${mood}. Explain why.`,
//                   },
//                 ],
//               },
//             ],
//           }),
//         },
//       );

//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error("Error fetching recommendations:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Book Recommendation App</h1>

//       <button onClick={getRecommendation}>Save Selection</button>
//       <button onClick={fetchRecommendations}>Get AI Recommendation</button>

//       {aiResponses.map((res, index) => (
//         <p key={index}>{res}</p>
//       ))}
//     </div>
//   );
// }
