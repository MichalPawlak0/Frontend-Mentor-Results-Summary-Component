const scoreEl = document.getElementById("score");
const commentEl = document.getElementById("comment");
const reactionScoreEl = document.getElementById("reactionScore");
const memoryScoreEl = document.getElementById("memoryScore");
const verbalScoreEl = document.getElementById("verbalScore");
const visualScoreEl = document.getElementById("visualScore");

let reactionScore;
let memoryScore;
let verbalScore;
let visualScore;

let overallScore;
let comment;

function fetchJSONData() {
            fetch("./data.json")
                .then((res) => {
                    if (!res.ok) {
                        throw new Error
                            (`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                  reactionScore = data[0].score;
                  memoryScore = data[1].score;
                  verbalScore = data[2].score;
                  visualScore = data[3].score;
                  overallScore = Math.floor((reactionScore + memoryScore + verbalScore + visualScore)/4);
                  comment = determineComment();
                  populateDomElements();
                })
                .catch((error) =>
                       console.error("Unable to fetch data:", error));
        }

function determineComment(){
  if(+overallScore<50){
    return "Need more practice";
  }else if(+overallScore>=50 && +overallScore<75){
    return "Good";
  }else if(+overallScore>=75 && +overallScore<90){
    return "Great";
  }else if(+overallScore>=90 && +overallScore<100){
    return "Excellent";
  }else if(+overallScore == 100){
    return "Perfect!";
  }
}

function populateDomElements() {
  scoreEl.innerText = overallScore;
  commentEl.innerText = comment;
  reactionScoreEl.innerText = reactionScore;
  memoryScoreEl.innerText = memoryScore;
  verbalScoreEl.innerText = verbalScore;
  visualScoreEl.innerText = visualScore;
}

fetchJSONData();

