const API_KEY = config.API_KEY;
const BASEURL = "https://api.nasa.gov";

const dateInput = document.getElementById("date-input");
const pictureBtn = document.getElementById("potd-btn");

pictureBtn.addEventListener("click", () => {
  const dateVal = dateInput.value;

  // check if date value is empty
  if (dateVal) searchPotd(dateVal);
  else return;
  //   console.log(dateVal);
});

// searches for the picture of the day (may be an img or video)
function searchPotd(date) {
  const startDate = new Date("1995-06-16").toISOString().split("T");
  const todaysDate = new Date().toISOString().split("T");

  // check if the date is valid
  if (!(date >= startDate && date <= todaysDate)) return;

  const url = `${BASEURL}/planetary/apod?api_key=${API_KEY}&date=${date}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      // check if the media type is an image or video
      if (data.media_type === "image") displayPotdImg(data);
      else if (data.media_type === "video") displayPotdVid(data);
      else return;
    })
    .catch((error) => console.log(`${error}`));
}

// displays the image for picture of the day
function displayPotdImg(data) {
  const imageDate = document.getElementById("apotd-date");
  const imgLink = document.getElementById("potd-img-link");
  const apotdImg = document.getElementById("apotd-img");
  const iframe = document.getElementById("apotd-video");
  const apotdTitle = document.getElementById("apotd-title");
  const copyright = document.querySelector(".copyright");
  const explanation = document.getElementById("explanation-para");

  // image date
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

  // picture of the day
  apotdImg.alt = "picture of the day";
  apotdImg.src = `${data.hdurl}`;
  apotdImg.style.display = "block"; // show image
  iframe.style.display = "none"; // hide video

  imgLink.href = apotdImg.src;

  // picture of the day title
  apotdTitle.textContent = `${data.title}`;

  // image credit & copyright
  copyright.innerHTML = `Image Credit & Copyright: <span id="id="img-credit-copyright"">${data.copyright}</span>`;
  copyright.style.display = "block"; // show copyright info

  // explanation
  explanation.textContent = `${data.explanation}`;
}
