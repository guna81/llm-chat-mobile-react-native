import React, { useState } from "react";

import { Camera, CameraType } from "expo-camera";

const useCamera = () => {
  const [facing, setFacing] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  function toggleCameraFacing() {
    setFacing((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return { permission, requestPermission, facing, toggleCameraFacing };
};

export default useCamera;
