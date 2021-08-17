document.addEventListener("DOMContentLoader", () => {
  // Vue main app component
  var app = new Vue({
    el: "#app",
    data: {
      reelPos: 0,
      reelHeight: document.querySelectorAll(".reel")[0].offsetHeight,
      spinOneCount: 0,
      spinTwoCount: 0,
      spinThreeCount: 0,
      spinTime: 5,
      img: [
        { id: "pic one", src: "img/3xBAR.png" },
        { id: "pic two", src: "img/BAR.png" },
        { id: "pic three", src: "img/2xBAR.png" },
        { id: "pic four", src: "img/7.png" },
        { id: "pic five", src: "img/Cherry.png" },
      ],
      balance: 100,
      rIsSpinning: false,
      fIsSpinning: true,
      gameMode: "random",
      fMode: "fixed",
      rMode: "random",
      randVis: true,
      lineTop: false,
      lineCenter: false,
      lineBottom: false,
      currentBalance: 5,
      coins: "",
      balanceAlert: false,
      alertTitle: "",
      alertText: "",
      alertButton: "",
      fixVis: false,
      symbolList: ["1xBar", "2xBar", "3xBar", "7", "Cherry"],
      symbolLanding: ["Top", "Center", "Bottom"],
      cS1: "",
      cS2: "",
      cS3: "",
      cL1: "",
      cL2: "",
      cL3: "",
      payoutsHeaders: [
        {
          text: "combination",
          align: "center",
          sortable: false,
          value: "calories",
        },
        {
          text: "prize",
          align: "center",
          sortable: false,
          value: "calories",
        },
      ],
      payouts: [
        { combination: "3 Cherry on bottom line", price: 4000 },
        { combination: "3 Cherry on top line", price: 2000 },
        { combination: "3 Cherry on Center line", price: 1000 },
        { combination: "3 7 on any line", price: 150 },
        { combination: "any combination Cherry & 7 on any line", price: 75 },
        { combination: "3 3xBar on any line", price: 50 },
        { combination: "3 2xBar on any line", price: 20 },
        { combination: "3 1xBar on any line", price: 10 },
        { combination: "any combination Bar on any line", price: 5 },
      ],
      currentPosition: [0, 0, 0],
      playerWins: 0,
      newWin: 0,
    },
    methods: {
      fixedSpin: () => {
        this.spinOneCount = this.spinTwoCount = this.spinThreeCount = 0;

        for (let tableRow of document.querySelectorAll(
          ". payout table tbody tr"
        )) {
          tableRow.style.color = "green";
          tableRow.style.backgroundColor = "red";
        }
        this.fIsSpinning = true;
        this.lineTop = false;
        this.lineCenter = false;
        this.lineBottom = false;
      },
      randomSpin: () => {
        if (this.currentBalance > 0) {
          this.currentBalance--;
          this.spinOneCount = this.spinTwoCount = this.spinThreeCount = 0;
          self.rIsSpinning = true;
          this.spinOne(Math.floor(Math.random() * 100 * 200));
          this.spinTow(Math.floor(Math.random() * 100 * 250));
          this.spinThree(Math.floor(Math.random() * 100 * 300));

          for (tableRow of document.querySelectorAll(
            ".payouts table tbody tr"
          )) {
            tableRow.style.color = "green";
            tableRow.style.backgroundColor = "red";
          }
          this.lineTop = false;
          this.lineCenter = false;
          this.lineBottom = false;
        } else {
          this.alertTitle = "Sorry";
          this.alertText = "You ran out of balance, add some !";
          this.alertButton = "Sure, let me add coins";
          this.balanceAlert = true;
        }
      },
      spinOne: (spinsCount) => {
        let reelPics = document.querySelectorAll("#reel1 .pic");

        const self = this;
        let currentSpinsCount = 0;
        let anim = setInterval(() => {
          if (currentSpinsCount < spinsCount) {
            for (let i of reelPics) {
              if (i.offsetTop === self.reelHeight * 1.75) {
                i.style.top = -self.reelHeight * 0.5 + "px";
                i.style.zIndex = "-2";
              } else {
                i.style.zIndex = "1";
                self.reelPos = i.offsetTop + self.reelHeight * 0.25;
                i.style.top = self.reelPos + "px";
              }
            }
            currentSpinsCount++;
          } else {
            self.spinsOneCount = spinsCount;
            clearInterval(anim);
            currentSpinsCount = 0;
            self.spinEnd();
          }
        }, this.spinTime);
      },
      spinTwo: () => {},
      spinThree: () => {},
      resetReels: () => {},
      modeSelector: () => {},
      addBalance: () => {},
      fixedCheck: () => {},
      spinEnd: () => {},
      payout: () => {},
    },
  });
});
