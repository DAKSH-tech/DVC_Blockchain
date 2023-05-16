// Main file- to post vote data to smart contract and get data from them
let phoneNumber = '';

function storePhoneNumber() {
  phoneNumber = document.getElementById('aadhar').value;
}
function checkNo(phoneNumber){
  let text = phoneNumber.toString();
  if(text.length==2){
    return false;
  }
  return true;
}
async function getResult(element){
    if(phoneNumber=='' || checkNo(phoneNumber)){
        alert("Not able to submit , enter right Aadhar")
        console.log("Not able to submit");
    }else{
        console.log(phoneNumber);
        console.log(element.value); 
        await window.contract.methods.addVote(phoneNumber,element.value).send({from: "0x71ADF89d489f1D0Cc98A7499FaB343259ae1B306"});
        alert("your vote has been submitted successfully");
    }
}
window.onload = async function() {
    let account;
    connectMetamask = async () => {
        if(window.ethereum !== "undefined") {
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            account = accounts[0];
            console.log("Connected to metamask")
            //document.getElementById("accountArea").innerHTML = account;
        }
    };
    await connectMetamask();
    const connectContract = async () => {
      const ABI = [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_aadharCardNo",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "_partyName",
              "type": "string"
            }
          ],
          "name": "addVote",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "name": "candidateMap",
          "outputs": [
            {
              "internalType": "string",
              "name": "partyName",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "countVote",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "candidateNames",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getAllCandidates",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "partyName",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "countVote",
                  "type": "uint256"
                }
              ],
              "internalType": "struct VotingSystem.Candidate[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getResult",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "voterMap",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "aadharCardNo",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "partyName",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isVoted",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
      const Address = "0xC8Aca6537bC1ad6a89a6548405651AB946067d2c";
      window.web3 = await new Web3(window.ethereum);
      window.contract = await new window.web3.eth.Contract( ABI, Address); 
      //document.getElementById("contractArea").innerHTML = "connected to smart contract";
    }
    await connectContract();
}


 