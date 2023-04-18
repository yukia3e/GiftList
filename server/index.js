const express = require("express");
const verifyProof = require("../utils/verifyProof");
const niceList = require("../utils/niceList");
const MerkleTree = require("../utils/MerkleTree");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "83a8f0413a75fd8997c91f26f86a81c2fe97c5b24706f4b27e1d0abbb135f5ee";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const name = body.name;

  // TODO: prove that a name is in the list
  const index = niceList.findIndex((n) => n === name);
  const merkleTree = new MerkleTree(niceList);
  const proof = merkleTree.getProof(index);
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
