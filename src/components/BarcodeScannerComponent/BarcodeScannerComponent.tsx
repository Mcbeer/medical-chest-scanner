import { BrowserMultiFormatReader, Result } from "@zxing/library";
import React, { LegacyRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";

export const BarcodeScannerComponent = ({
  onUpdate,
  onError,
  width = "100%",
  height = "100%",
  facingMode = "environment",
  torch = false,
  delay = 500,
  videoConstraints,
  stopStream,
}: {
  onUpdate: (arg0: unknown, arg1?: Result) => void;
  onError?: (arg0: string | DOMException) => void;
  width?: number | string;
  height?: number | string;
  facingMode?: "environment" | "user";
  torch?: boolean;
  delay?: number;
  videoConstraints?: MediaTrackConstraints;
  stopStream?: boolean;
}): React.ReactElement => {
  const webcamRef: LegacyRef<Webcam> | null = React.useRef(null);

  const capture = useCallback(() => {
    const codeReader = new BrowserMultiFormatReader();
    const imageSrc = webcamRef?.current?.getScreenshot();
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
      navigator?.mediaDevices?.getSupportedConstraints?.().torch
    ) {
      const stream = getWebcamSrcObject();
      // @ts-ignore
      const track = stream && stream.getVideoTracks()[0]; // get the active track of the stream
      if (track.getCapabilities?.().torch && !track.getConstraints?.().torch) {
        track
          .applyConstraints({
            advanced: [{ torch }],
          })
          .catch((err: any) => onUpdate(err));
      }
    }
  }, [torch, onUpdate]);

  const stop = useCallback(() => {
    let stream = getWebcamSrcObject();
    if (stream) {
      // @ts-ignore
      stream.getTracks().forEach((track: any) => {
        // @ts-ignore
        stream.removeTrack(track);
        track.stop();
      });
      stream = null;
    }
  }, []);

  useEffect(() => {
    if (stopStream) {
      stop();
    }
  }, [stopStream, stop]);

  useEffect(() => {
    const interval = setInterval(capture, delay);
    return () => {
      clearInterval(interval);
    };
  }, [capture, delay]);

  const getWebcamSrcObject = () => {
    return (
      webcamRef &&
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.srcObject
    );
  };

  return (
    <>
      <Webcam
        width={width}
        height={height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={
          videoConstraints || {
            facingMode,
          }
        }
        audio={false}
        onUserMediaError={onError}
      />
      <div className="Scan__target"></div>
    </>
  );
};
