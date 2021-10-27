import * as Device from "expo-device";
import { Platform } from "react-native";

export default {
  brand: Device.brand,
  model: Device.modelName,
  platform: Platform.OS,
  version: Device.osVersion,
  name: Device.deviceName,
};
