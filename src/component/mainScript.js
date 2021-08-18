document.addEventListener("DOMContentLoaded", () => {
  // Vue main app component
  var app = new Vue({
    el: "#app",
    data: {
      reelPos: 0,
      reelHeight: document.querySelectorAll(".reel")[0].offsetHeight,
      spinOneCount: 0,
      spinTwoCount: 0,
      spinThreeCount: 0,
      spinTime: 10,
      pics: [
        { id: "pic one", src: "src/pics/3xBAR.png" },
        { id: "pic two", src: "src/pics/BAR.png" },
        { id: "pic three", src: "src/pics/2xBAR.png" },
        { id: "pic four", src: "src/pics/7.png" },
        { id: "pic five", src: "src/pics/Cherry.png" },
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
          text: "Combination",
          align: "left",
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
        { combination: "3 Cherry on bottom line", prize: 4000 },
        { combination: "3 Cherry on top line", prize: 2000 },
        { combination: "3 Cherry on Center line", prize: 1000 },
        { combination: "3 7 on any line", prize: 150 },
        { combination: "any combination Cherry & 7 on any line", prize: 75 },
        { combination: "3 3xBar on any line", prize: 50 },
        { combination: "3 2xBar on any line", prize: 20 },
        { combination: "3 1xBar on any line", prize: 10 },
        { combination: "any combination Bar on any line", prize: 5 },
      ],
      currentPosition: [0, 0, 0],
      playerWins: 0,
      newWin: 0,
    },
    methods: {
      fixedSpin: function () {
        this.spinOneCount = this.spinTwoCount = this.spinThreeCount = 0;

        for (let tableRow of document.querySelectorAll(
          ".payouts table tbody tr"
        )) {
          tableRow.style.color = "green";
          tableRow.style.backgroundColor = "red";
        }
        this.fIsSpinning = true;
        this.lineTop = false;
        this.lineCenter = false;
        this.lineBottom = false;
        //
        if (
          (this.cS1 === "CHERRY" && this.cL1 === "Top") ||
          (this.cS1 === "3xBAR" && this.cL1 === "Bottom")
        ) {
        }
      },
      randomSpin: function () {
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
      spinOne: function (spinsCount) {
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
            self.spinOneCount = spinsCount;
            clearInterval(anim);
            currentSpinsCount = 0;
            self.spinEnd();
          }
        }, this.spinTime);
      },
      spinTwo: function (spinsCount) {
        let reelPics = document.querySelectorAll("#reel2 .pic");
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
            self.spinTwoCount = spinsCount;
            clearInterval(anim);
            currentSpinsCount = 0;
            self.spinEnd();
          }
        }, this.spinTime);
      },
      spinThree: function (spinsCount) {
        let reelPics = document.querySelectorAll("#reel3 .pic");
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
            self.spinThreeCount = spinsCount;
            clearInterval(anim);
            currentSpinsCount = 0;
            self.spinEnd();
          }
        }, this.spinTime);
      },
      resetReels: function () {
        //
        document.getElementsByClassName("pic one")[0].style.top = "-25%";
        document.getElementsByClassName("pic two")[0].style.top = "25%";
        document.getElementsByClassName("pic three")[0].style.top = "75%";
        document.getElementsByClassName("pic four")[0].style.top = "125%";
        document.getElementsByClassName("pic five")[0].style.top = "175%";
        //
        document.getElementsByClassName("pic one")[1].style.top = "-25%";
        document.getElementsByClassName("pic two")[1].style.top = "25%";
        document.getElementsByClassName("pic three")[1].style.top = "75%";
        document.getElementsByClassName("pic four")[1].style.top = "125%";
        document.getElementsByClassName("pic five")[1].style.top = "175%";
        //
        document.getElementsByClassName("pic one")[2].style.top = "-25%";
        document.getElementsByClassName("pic two")[2].style.top = "25%";
        document.getElementsByClassName("pic three")[2].style.top = "75%";
        document.getElementsByClassName("pic four")[2].style.top = "125%";
        document.getElementsByClassName("pic five")[2].style.top = "175%";

        this.currentPosition = [0, 0, 0];
        this.lineTop = false;
        this.lineCenter = false;
        this.lineBottom = false;
      },
      modeSelector: function () {
        this.gameMode === "random"
          ? (this.randVis = true)((this.fixVis = false))
          : (this.randVis = false)((this.fixVis = true));
      },
      addBalance: function () {
        this.coins > 0 &&
        this.coins <= 5000 &&
        Number.isInteger(Number(this.coins))
          ? (this.addCoinsError = false)(
              (this.currentBalance = Number(this.coins))
            )
          : (this.alertTitle = "Wrong input")(
              (this.alertText = "Only Integers max 5000")(
                (this.alertButton = "Ok")
              )((this.balanceAlert = true))
            );
      },
      fixedCheck: function () {
        this.cS1 !== "" &&
        this.cL1 !== "" &&
        this.cS2 !== "" &&
        this.cL2 !== "" &&
        this.cS3 !== "" &&
        this.cL3 !== ""
          ? (this.fIsSpinning = false)
          : null;
      },
      spinEnd: function () {
        if (
          this.spinOneCount !== 0 &&
          this.spinTwoCount !== 0 &&
          this.spinThreeCount !== 0
        ) {
          let posOneDigit = this.spinOneCount % 10;
          let posTwoDigit = this.spinTwoCount % 10;
          let posThreeDigit = this.spinThreeCount % 10;
          this.currentPosition[0] =
            (this.currentPosition[0] + posOneDigit) & 10;
          this.currentPosition[1] =
            (this.currentPosition[1] + posTwoDigit) & 10;
          this.currentPosition[2] =
            (this.currentPosition[2] + posThreeDigit) & 10;
          this.rIsSpinning = false;
          this.fIsSpinning = false;
          this.payout();
        }
      },
      payout: function () {
        this.newWin = 0;
        let payRow;
        let list = listOfPositions;
        for (let i in list) {
          if (list[i].pos === this.currentPosition.join("")) {
            for (let j of list[i].det) {
              this.newWin += j.prize;
              for (let comb of this.payouts) {
                if (comb.combination === j.text) {
                  payRow = document.querySelectorAll(".payouts table tbody tr")[
                    this.payouts.indexOf(comb)
                  ];
                  payRow.style.color = "#fff";
                  payRow.style.backgroundColor = "green";
                  if (j.line === "top") {
                    this.lineTop = true;
                  } else if (j.line === "center") {
                    this.lineCenter = true;
                  } else {
                    this.lineBottom = true;
                  }
                }
              }
            }
            this.playerWins += this.newWin;
            this.currentBalance += this.newWin;
          }
        }
      },
    },
  });
});
