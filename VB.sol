// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Candidate {
        string partyName;
        uint256 countVote;
    }
    
    struct Voter {
        uint256 aadharCardNo;
        string partyName;
        bool isVoted;
    }
    
    mapping(string => Candidate) public candidateMap;
    constructor() {
        candidateMap["BJP"] = Candidate("BJP", 0);
        candidateMap["Cong"] = Candidate("Cong", 0);
        candidateMap["BSP"] = Candidate("BSP", 0);
        candidateMap["CPI"] = Candidate("CPI", 0);
        candidateMap["CPM"] = Candidate("CPM", 0);
    }
    mapping(uint256 => Voter) public voterMap;
    string[] public candidateNames;
    function addVote(uint256 _aadharCardNo, string memory _partyName) public {
        require(!voterMap[_aadharCardNo].isVoted, "This voter has already voted.");
        Voter storage v = voterMap[_aadharCardNo];
        v.aadharCardNo = _aadharCardNo;
        v.partyName = _partyName;
        v.isVoted = true;
        if (candidateMap[_partyName].countVote == 0) {
            candidateNames.push(_partyName);
        }
        Candidate storage candidate = candidateMap[_partyName];
        candidate.partyName = _partyName;
        candidate.countVote++;
    }
    function getResult() public view returns(string memory) {
        uint256 maxVotes = 0;
        string memory winnerName = "";
        for (uint256 i = 0; i < candidateNames.length; i++) {
            uint256 votes = candidateMap[candidateNames[i]].countVote;
            if (votes > maxVotes) {
                maxVotes = votes;
                winnerName = candidateNames[i];
            }
        }
        return winnerName;
    }
    function getAllCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory candidates = new Candidate[](candidateNames.length);

        for (uint256 i = 0; i < candidateNames.length; i++) {
            string memory name = candidateNames[i];
            uint256 count = candidateMap[name].countVote;

            candidates[i] = Candidate(name, count);
        }

        return candidates;
    }
    
}