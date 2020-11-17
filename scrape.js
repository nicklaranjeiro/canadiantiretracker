var request = require("request");
var nodemailer = require("nodemailer");
const urlDbSet =
  "https://www.canadiantire.ca/ESB/ProductServices/getStoreInventory?SKU=0840760&Store=0027%2C0177%2C0143%2C0045%2C0220%2C0639%2C0429%2C0129%2C0154%2C0194%2C0122%2C0412%2C0049%2C0241%2C0664&C0143&C0664&Banner=CTR&isKiosk=FALSE&Language=E&_=1588623322295";

//%2C0429 add after (Oakville store)
const urlDb35 =
  "https://www.canadiantire.ca/ESB/ProductServices/getStoreInventory?SKU=0840355&Store=0027%2C0177%2C0143%2C0045%2C0220%2C0639%2C0129%2C0154%2C0194%2C0122%2C0412%2C0049%2C0241%2C0664&C0143&C0664&Banner=CTR&isKiosk=FALSE&Language=E&_=1588623322295";

const urlDb40 =
  "https://www.canadiantire.ca/ESB/ProductServices/getStoreInventory?SKU=0840355&Store=0027%2C0177%2C0143%2C0045%2C0220%2C0639%2C0129%2C0154%2C0194%2C0122%2C0412%2C0049%2C0241%2C0664&C0143&C0664&Banner=CTR&isKiosk=FALSE&Language=E&_=1588623322295";

//%2C0429 add after (Oakville store)
const urlDb30 =
  "https://www.canadiantire.ca/ESB/ProductServices/getStoreInventory?SKU=0840354&Store=0027%2C0177%2C0143%2C0045%2C0220%2C0639%2C0129%2C0154%2C0194%2C0122%2C0412%2C0049%2C0241%2C0664&C0143&C0664&Banner=CTR&isKiosk=FALSE&Language=E&_=1588623322295";

//%2C0429 add after (Oakville store)
const urlDb20 =
  "https://www.canadiantire.ca/ESB/ProductServices/getStoreInventory?SKU=0840322&Store=0027%2C0177%2C0143%2C0045%2C0220%2C0639%2C0129%2C0154%2C0194%2C0122%2C0412%2C0049%2C0241%2C0664&C0143&C0664&Banner=CTR&isKiosk=FALSE&Language=E&_=1588623322295";

const urlPlt10 =
  "https://www.canadiantire.ca/ESB/ProductServices/getStoreInventory?SKU=0840042&Store=0027%2C0177%2C0143%2C0045%2C0220%2C0639%2C0129%2C0154%2C0194%2C0122%2C0412&C0664&Banner=CTR&isKiosk=FALSE&Language=E&_=1588623322295";

const urlBflxDb =
  "https://www.canadiantire.ca/ESB/ProductServices/getStoreInventory?SKU=0848962&Store=0027%2C0177%2C0143%2C0045%2C0220%2C0639%2C0129%2C0154%2C0194%2C0122%2C0412%2C0049%2C0241%2C0664&C0143&C0664&Banner=CTR&isKiosk=FALSE&Language=E&_=1588623322295";

const urlBflxBench =
  "https://www.canadiantire.ca/ESB/ProductServices/getStoreInventory?SKU=0847998&Store=0027%2C0177%2C0143%2C0045%2C0220%2C0639%2C0129%2C0154%2C0194%2C0122%2C0412%2C0049%2C0241%2C0664&C0143&C0664&Banner=CTR&isKiosk=FALSE&Language=E&_=1588623322295";

const store = {
  "0027": "Dundas - Cootes",
  "0045": "Hamilton - Main Street",
  "0049": "Caledonia",
  "0129": "Hamilton - Barton",
  "0143": "Oakville - Kerr",
  "0154": "Stoney Creek - Queenston",
  "0177": "Hamilton - Upper James",
  "0194": "Hamilton Mt.",
  "0220": "Waterdown",
  "0241": "Mississauga",
  "0412": "Burlington - Appleby",
  "0429": "Oakville - Dundas Street",
  "0639": "Ancaster - Wilson",
  "0664": "Brantford - Lynden",
  "0122": "Burlington - Fairview",
};

function checkQuantity(url, itemName) {
  request(
    {
      url: url,
      timeout: 5000,
      headers: {
        Accept: "application/json, text/javascript, */*",
        "User-Agent": "axios/0.18.0",
      },
    },
    (error, response, body) => {
      if (!error) {
        data = JSON.parse(body);
        for (var i = 0; i < data.length; i++) {
          if (data[i].Quantity > 0) {
            console.log("PRODUCT FOUND");
            var message =
              itemName +
              " - Store: " +
              store[data[i].Store] +
              " has stock of " +
              data[i].Quantity;
            sendMail(message);
          }
        }
      } else {
        console.error(`request got an error`, error);
      }
    }
  );
}

function sendMail(message) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "stockfinder97@gmail.com",
      pass: "StockFinder32!!",
    },
  });

  var mailOptions = {
    from: "stockfinder97@gmail.com",
    to: "email@hotmail.com",
    subject: "Stock Found!",
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

setInterval(function () {
  console.log("Looking...");
  //checkQuantity(urlDbSet, "Dumbbell Set");
  checkQuantity(urlDb20, "20lb dumbbells");
  checkQuantity(urlDb30, "30lb dumbbells");
  //checkQuantity(urlDb35, "35lb dumbbells");
  checkQuantity(urlBflxBench, "Bowflex Bench");
  //checkQuantity(urlBflxDb, "Bowflex Dumbbell");
  //checkQuantity(urlDb40, "40lb dumbbells");
  checkQuantity(urlPlt10, "10lb plates");
}, 25000);
