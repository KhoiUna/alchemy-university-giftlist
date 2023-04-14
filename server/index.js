const express = require("express");
const verifyProof = require("../utils/verifyProof");
const MerkleTree = require("../utils/MerkleTree");
const niceList = require("../utils/niceList");

const port = 1225;

const app = express();
app.use(express.json());
app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const { proof, leaf: name } = req.body;

  // create the merkle tree for the whole nice list
  const merkleTree = new MerkleTree(niceList);

  // get the root
  const root = merkleTree.getRoot();
  console.log("Merkle root:", root);

  // verify proof against the Merkle Root
  const isInTheList = verifyProof(proof, name, root);
  console.log("Verified:", isInTheList);

  if (isInTheList) return res.send("You got a toy robot!");

  return res.send("You are not on the list :(");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
