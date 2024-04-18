import React, { useRef, useState } from "react";
import { AssemblyAI } from "assemblyai";
import { Button, Typography } from "@material-tailwind/react";
import { GiSoundOn, GiSoundWaves } from "react-icons/gi";
import { RiBardLine } from "react-icons/ri";
import { useLang } from "../../hook/LangContext";

const client = new AssemblyAI({
  apiKey: "b2937b1ae7604a4b8ea5fe1fd0fab52f",
});

export default function AudioTranscription({ setDescription }) {
  const { translations } = useLang();
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const [file2, setFile2] = useState();
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const fileInputRef = useRef(null);

  const removeFile = () => {
    setFile(null);
    setFileName("");
  };

  const onFileChange = (event) => {
    try {
      setLoadingAudio(true);
      const selectedFile = event.target.files[0];

      if (!selectedFile) {
        throw new Error("No file selected");
      }

      fileRef.current = selectedFile;
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFile2(selectedFile);
    } catch (error) {
      console.error("Error during file selection:", error.message);
      setFile(null);
      setFileName("");
    } finally {
      setLoadingAudio(false);
    }
  };

  const audioUrl = fileRef.current;
  //"https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3";

  const params = {
    audio: audioUrl,
  };
  //   const formData = new FormData();
  //   formData.append("audio", fileRef.current);

  const runTranscription = async () => {
    try {
      setLoading(true);
      const transcript = await client.transcripts.transcribe(params as any);
      setDescription(transcript.text);
      setLoading(false);
      setFile(null);
      setFileName("");
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <div className="flex items-end gap-4 flex-wrap">
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={onFileChange}
        className="hidden"
      />

      {file === null ? (
        ""
      ) : (
        <div className="flex items-center">
          <audio
            className="h-8"
            src={URL.createObjectURL(fileRef.current as any)}
            controls
          />
          <div
            onClick={() => removeFile()}
            className="ml-[-15px] bg-red-300 text-white text-[10px] cursor-pointer z-50 w-6 h-6 flex items-center justify-center rounded-full"
          >
            x
          </div>
        </div>
      )}

      <div>
        <span className="text-xs">{translations.transcribe_audio}</span>
        {fileName}
        <Button
          onClick={() => {
            file === null
              ? (fileInputRef?.current as any).click()
              : runTranscription();
          }}
          placeholder={""}
          className="p-1 rounded-full border-none bg-deep-purple-300 normal-case tracking-wide flex items-center gap-2"
        >
          <RiBardLine size={16} />
          {file === null ? (
            " Buscar áudio"
          ) : (
            <>{loading ? "Transcrevendo..." : "Transcrever"}</>
          )}
          <GiSoundOn size={18} />
        </Button>
      </div>
    </div>
  );
}
