import { useEffect, useState } from "react";
import { RecordRTCPromisesHandler } from "recordrtc";

export const useRecorderPermission = () => {
  const [recorder, setRecorder] = useState();
  const [stream, setStream] = useState();

  const getPermissionInitializeRecorder = async () => {
    try {
      let stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      let recorder = new RecordRTCPromisesHandler(stream, {
        type: "audio",
      });
      setRecorder(recorder);
      setStream(stream);
    } catch (error) {
      console.log(error)
    }
  };

  const closeMicrophone = () => {
    stream.getTracks().forEach((track) => {
      track.stop();
    });
  }

  return {
    recorder,
    getPermissionInitializeRecorder,
    closeMicrophone
  };
};