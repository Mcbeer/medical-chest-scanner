import { BrowserMultiFormatReader, Result } from "@zxing/library";
import React, { Ref, useCallback, useEffect, useRef } from "react";
import Webcam from "react-webcam";

export const BarcodeScannerComponent = ({
  onUpdate,
  onError,
  facingMode = "environment",
  torch = false,
  delay = 500,
  videoConstraints,
}: {
  onUpdate: (arg1?: Result) => void;
  onError?: (arg0: string | DOMException) => void;
  facingMode?: "environment" | "user";
  torch?: boolean;
  delay?: number;
  videoConstraints?: MediaTrackConstraints;
}): React.ReactElement => {
  const webcamRef: Ref<Webcam> | null = useRef(null);

  const getWebcamSrcObject = webcamRef?.current?.video?.srcObject;

  const capture = useCallback(() => {
    const codeReader = new BrowserMultiFormatReader();
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      codeReader
        .decodeFromImage(undefined, imageSrc)
        .then((result) => {
          onUpdate(result);
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

      // @ts-ignore
      const track = stream?.getVideoTracks()[0]; // get the active track of the stream
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
      <Webcam
        autoPlay={true}
        width={window.innerWidth}
        height={window.innerHeight}
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
