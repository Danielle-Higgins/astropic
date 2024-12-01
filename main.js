class AstroPic {
  // private properties
  #dateInput;
  #pictureBtn;

  // private variables
  #API_KEY = config.API_KEY;
  #BASEURL = "https://api.nasa.gov";

  constructor(input, button) {
    this.#dateInput = document.getElementById(input);
    this.#pictureBtn = document.getElementById(button);
  }

  // runs the program
  pictureOfTheDay() {
    this.#pictureBtn.addEventListener("click", () => {
      const dateVal = this.#dateInput.value;

      // check if date value is empty
      if (dateVal) this.#searchPotd(dateVal);
      else return;

      // console.log(dateVal);
    });
  }

  // searches for the picture of the day (may be an img or video)
  #searchPotd(date) {
    const startDate = new Date("1995-06-16").toISOString().split("T");
    const todaysDate = new Date().toISOString().split("T");

    // check if the date is valid
    if (!(date >= startDate && date <= todaysDate)) return;

    const url = `${this.#BASEURL}/planetary/apod?api_key=${
      this.#API_KEY
    }&date=${date}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // check if the media type is an image or video
        if (data.media_type === "image") this.#displayPotdImg(data);
        else if (data.media_type === "video") this.#displayPotdVid(data);
        else return;
      })
      .catch((error) => console.log(`${error}`));
  }

  // displays the image for picture of the day
  #displayPotdImg(imgData) {
    const imgLink = document.getElementById("potd-img-link");
    const apotdImg = document.getElementById("apotd-img");
    const iframe = document.getElementById("apotd-video");

    // picture of the day
    apotdImg.alt = "picture of the day";
    apotdImg.src = `${imgData.hdurl}`;
    apotdImg.style.display = "block"; // show image
    iframe.style.display = "none"; // hide video

    imgLink.href = apotdImg.src;

    // picture of the day title
    this.#getTitle(imgData);

    // image date
    this.#getPotdDate(imgData);

    // image credit & copyright
    this.#getImgCreditAndCopyright(imgData);

    // explanation
    this.#getExplanation(imgData);
  }

  #displayPotdVid(videoData) {
    const iframe = document.getElementById("apotd-video");
    const apotdImg = document.getElementById("apotd-img");

    iframe.src = `${videoData.url}`;
    iframe.style.display = "block"; // show video
    apotdImg.style.display = "none"; // hide image

    // picture of the day title
    this.#getTitle(videoData);

    // image date
    this.#getPotdDate(videoData);

    // image credit & copyright
    this.#getImgCreditAndCopyright(videoData);

    // explanation
    this.#getExplanation(videoData);
  }

  // get picture of the day title
  #getTitle(data) {
    const apotdTitle = document.getElementById("apotd-title");
    apotdTitle.textContent = `${data.title}`;
  }

  // get the date for the picture of the day
  #getPotdDate(data) {
    const imageDate = document.getElementById("apotd-date");

    const dateParts = data.date.split("-");
    const year = dateParts[0];

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = months[dateParts[1] - 1];
    const day = dateParts[2];

    imageDate.textContent = `${month} ${day}, ${year}`;
  }

  // get the image credit and copyright info
  #getImgCreditAndCopyright(data) {
    const copyright = document.querySelector(".copyright");

    // check if the copyright property exists
    if ("copyright" in data) {
      copyright.innerHTML = `Image Credit & Copyright: <span id="id="img-credit-copyright"">${data.copyright}</span>`;
    } else {
      copyright.innerHTML = "";
    }
  }

  // get the explanation
  #getExplanation(data) {
    const explanation = document.getElementById("explanation-para");
    explanation.textContent = `${data.explanation}`;
  }
}

const picOfDay = new AstroPic("date-input", "potd-btn");
picOfDay.pictureOfTheDay();
