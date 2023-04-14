const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

const RANDOM_NAME_INDEX = 800;
const RANDOM_LEAF = niceList[RANDOM_NAME_INDEX];

async function main() {
  try {
    const merkleTree = new MerkleTree(niceList);
    const root = merkleTree.getRoot();
    console.log("Merkle root:", root);

    const proof = merkleTree.getProof(RANDOM_NAME_INDEX);
    console.log(`Merkle proof for ${RANDOM_LEAF}:`, proof);

    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      proof,
      leaf: RANDOM_LEAF,
    });

    console.log({ gift });
  } catch (error) {
    console.error("Error verifying gift");
  }
}

main();
