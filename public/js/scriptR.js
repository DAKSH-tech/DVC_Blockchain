// This file is for Result.html

const readContract = async () =>{
  if (!window.contract) {
      console.log("Smart contract not connected");
      return;
  }
  const data = await window.contract.methods.getResult().call();
  document.getElementById("winner").innerHTML=`The winner is ${data}`;
} 

const callGraph = async () => {
  await getInsight2();
  await getInsight();
}

const getInsight = async () => {
  if (!window.contract) {
      console.log("Smart contract not connected");
      return;
  }
  const data = await window.contract.methods.getAllCandidates().call();
  let results = [];
  for (let i = 0; i < data.length; i++) {
      results.push([data[i].partyName, data[i].countVote]);
  }
  const chartConfig = {
      type: 'bar',
      data: {
          datasets: [{
              data: results.map(r => r[1]),
              backgroundColor: 'blue'
          }],
          labels: results.map(r => r[0])
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      stepSize: 1
                  }
              }],
              xAxes: [{
                  scaleLabel: {
                      display: true,
                      labelString: 'Party Name'
                  },
                  gridLines: {
                      display: false
                  },
                  type: 'category',
                  labels: results.map(r => r[0])
              }]
          }
      }
  };

  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, chartConfig);
};


const getInsight2 = async () => {
  if (!window.contract) {
    console.log("Smart contract not connected");
    return;
  }
  let totalVote=10,Voted=0;
  const data = await window.contract.methods.getAllCandidates().call();
  const results = data.map(d => ({ partyName: d.partyName, countVote: d.countVote }));
  for(let i=0;i<data.length;i++){
    Voted=Voted+ parseInt(data[i].countVote);
  }
  let noVote = totalVote-Voted;
  results.push({ partyName: "No Vote", countVote: noVote });

  const chartConfig = {
    type: 'pie',
    data: {
      datasets: [{
        data: results.map(r => r.countVote),
        backgroundColor: ['blue', 'green', 'red', 'purple', 'orange', 'gray'] // Change the colors if needed
      }],
      labels: results.map(r => r.partyName)
    }
  };

  const ctx = document.getElementById('myChart2').getContext('2d');
  if (window.myPieChart) {
    window.myPieChart.destroy();
  }
  window.myPieChart = new Chart(ctx, chartConfig);
};



