import { Button } from "@material-tailwind/react";
import React, { useState, useRef } from "react";
import { AiOutlineAudio } from "react-icons/ai";
import { HiOutlineStopCircle } from "react-icons/hi2";
import * as Yup from "yup";
import { useLang } from "../../hook/LangContext";
import useFetchData from "../../hook/useFetchData";

function MicrophoneAudioToText({ user, taskId, projectId }) {
  const { handleCreateSubtask } = useFetchData();
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState("");
  const recognitionRef = useRef(null);
  const [title, setTitle] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const { translations } = useLang();

  // const startTranscription = () => {
  //   const recognition = new (window.SpeechRecognition ||
  //     window.webkitSpeechRecognition)();
  //   recognitionRef.current = recognition;
  //   recognition.lang = "en-US";
  //   recognition.continuous = true;
  //   recognition.interimResults = true;

  //   recognition.onresult = (event) => {
  //     let interimTranscript = "";
  //     for (let i = event.resultIndex; i < event.results.length; i++) {
  //       const transcript = event.results[i][0].transcript;
  //       if (event.results[i].isFinal) {
  //         setTranscription((prev) => prev + transcript + " ");
  //       } else {
  //         interimTranscript += transcript;
  //       }
  //     }
  //     setTranscription((prev) => prev + interimTranscript);
  //     setTitle((prev) => prev + interimTranscript);
  //   };

  //   recognition.onerror = (event) => {
  //     console.error("Speech recognition error", event.error);
  //   };

  //   recognition.start();
  //   setIsListening(true);
  // };

  // const stopTranscription = () => {
  //   if (recognitionRef.current) {
  //     recognitionRef.current.stop();
  //   }
  //   setIsListening(false);
  // };
  const startTranscription = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognitionRef.current = recognition;
    recognition.lang = "pt-BR";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscription((prev) => prev + transcript + " ");
          setTitle((prev) => prev + transcript + " ");
        } else {
          interimTranscript += transcript;
        }
      }
      setTranscription((prev) => prev + interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    recognition.start();
    setIsListening(true);
  };

  const stopTranscription = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate({ title });
      const values = {
        title,
        user_created: user.email,
        taskId,
        projectId,
      };
      handleCreateSubtask.mutate(values);
      setTitle("");
      setTranscription("");
    } catch (error) {
      if (error.name === "ValidationError") {
        setFormErrors(error.errors);
        setTranscription("");
      } else {
        console.error(error.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-center gap-4 mt-2 flex-col md:flex-row flex-wrap"
    >
      <div className="relative flex items-center w-full md:w-fit">
        {isListening ? (
          <div
            onClick={stopTranscription}
            className="absolute ml-1 rounded-md flex items-center z-50 justify-center bg-gray-300 cursor-pointer transition-all text-gray-600 hover:text-[#11BEF4] shadow-lg h-7 w-7"
          >
            <HiOutlineStopCircle color="#ff4c4c" />
          </div>
        ) : (
          <div
            onClick={startTranscription}
            className="absolute ml-1 rounded-md flex items-center z-50 justify-center bg-gray-300 cursor-pointer transition-all text-gray-600 hover:text-[#11BEF4] shadow-lg h-7 w-7"
          >
            <AiOutlineAudio />
          </div>
        )}

        <input
          type="text"
          placeholder={translations.fragment_your_activity}
          name="title"
          className="w-full md:w-[250px] bg-white px-2 pl-9 h-9 border-2 rounded-md border-[#11BEF4]"
          value={title || transcription}
          onChange={(e) => {
            const newTitle =
              e.target.value.trim() !== "" ? e.target.value : transcription;
            setTitle(newTitle);
          }}
        />
      </div>
      <Button
        type="submit"
        disabled={title.length === 0 && transcription.length === 0}
        className="w-full md:w-[100px] h-9 px-2 py-0 bg-[#11BEF4] text-xs capitalize transition-all"
      >
        {translations.add}
      </Button>
    </form>
  );
}

export default MicrophoneAudioToText;
