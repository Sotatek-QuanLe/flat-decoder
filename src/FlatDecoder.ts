import { decode } from "cbor-x";
import { ProgramFlatCodec } from "./uplc/ProgramFlatCodec";

export const getUplc = (deserializeContract: string) => {
  //59014c01000032323232323232322223232325333009300e30070021323233533300b3370e9000180480109118011bae30100031225001232533300d3300e22533301300114a02a66601e66ebcc04800400c5288980118070009bac3010300c300c300c300c300c300c300c007149858dd48008b18060009baa300c300b3754601860166ea80184ccccc0288894ccc04000440084c8c94ccc038cd4ccc038c04cc030008488c008dd718098018912800919b8f0014891ce1317b152faac13426e6a83e06ff88a4d62cce3c1634ab0a5ec133090014a0266008444a00226600a446004602600a601a00626600a008601a006601e0026ea8c03cc038dd5180798071baa300f300b300e3754601e00244a0026eb0c03000c92616300a001375400660106ea8c024c020dd5000aab9d5744ae688c8c0088cc0080080048c0088cc00800800555cf2ba15573e6e1d200201

  const scriptFlat = decode(hexToUint8Array(deserializeContract));
  const program = ProgramFlatCodec.decodeFlat(scriptFlat);
  return program.pretty();
};

const hexToUint8Array = (hexString: string) => {
  // Remove the leading "0x" if present
  hexString = hexString.startsWith("0x") ? hexString.slice(2) : hexString;

  // Ensure the hex string has an even length
  if (hexString.length % 2 !== 0) {
    throw new Error("Invalid hex string");
  }

  // Create a Uint8Array
  const uint8Array = new Uint8Array(hexString.length / 2);

  // Iterate over the hex string, convert each pair of characters to a byte, and store it in the Uint8Array
  for (let i = 0; i < hexString.length; i += 2) {
    uint8Array[i / 2] = parseInt(hexString.substring(i, i + 2), 16);
  }

  return uint8Array;
};