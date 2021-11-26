import { BrowserMultiFormatReader, Result } from "@zxing/library";
import React, {
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Webcam from "react-webcam";

export const BarcodeScannerComponent = ({
  onUpdate,
  onError,
  facingMode = "environment",
  torch = false,
  delay = 500,
  videoConstraints,
}: {
  onUpdate: (arg0: unknown, arg1?: Result) => void;
  onError?: (arg0: string | DOMException) => void;
  facingMode?: "environment" | "user";
  torch?: boolean;
  delay?: number;
  videoConstraints?: MediaTrackConstraints;
}): React.ReactElement => {
  const [error, setError] = useState("");
  const webcamRef: Ref<Webcam> | null = useRef(null);

  const getWebcamSrcObject = useMemo(() => {
    return webcamRef?.current?.video?.srcObject;
  }, [webcamRef]);

  const capture = useCallback(() => {
    const codeReader = new BrowserMultiFormatReader();
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      codeReader
        .decodeFromImage(undefined, imageSrc)
        .then((result) => {
          onUpdate(null, result);
        })
        .catch(() => {
          return;
        });
    }
  }, [onUpdate]);

  useEffect(() => {
    // Turn on the flashlight if prop is defined and device has the capability
    if (
      typeof torch === "boolean" &&
      // @ts-ignore
      navigator.mediaDevices.getSupportedConstraints().torch
    ) {
      const stream = getWebcamSrcObject;
      if (!stream) {
        setError("No stream found");
        return;
      }

      // @ts-ignore
      const track = stream.getVideoTracks()[0]; // get the active track of the stream
      if (track?.getCapabilities?.().torch && !track.getConstraints?.().torch) {
        track
          .applyConstraints({
            advanced: [{ torch }],
          })
          .catch((err: any) => onUpdate(err));
      }
    }
  }, [torch, onUpdate, getWebcamSrcObject]);

  useEffect(() => {
    const interval = setInterval(capture, delay);
    return () => {
      clearInterval(interval);
    };
  }, [capture, delay]);

  return (
    <>
      <p style={{ position: "fixed", bottom: 0, zIndex: 100 }}>
        {torch.toString()}
      </p>
      <p style={{ position: "absolute", top: "50%", left: "50%" }}>{error}</p>
      <Webcam
        autoPlay={true}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={
          videoConstraints || {
            facingMode,
          }
        }
        audio={false}
        onUserMediaError={onError}
        style={{ objectFit: "fill" }}
      />
    </>
  );
};
