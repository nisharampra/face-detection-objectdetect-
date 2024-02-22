var detector;
var classifier = objectdetect.frontalface;
var capture;
var faces;

function setup() {
  createCanvas(640, 480); // Use standard values for width and height
  pixelDensity(1);
  capture = createCapture(VIDEO);
  capture.size(640, 480); // Use standard values for width and height
  capture.hide();

  var scaleFactor = 1.2;
  detector = new objectdetect.detector(width, height, scaleFactor, classifier);

  // Create a button and associate the captureFrame function with it
  var captureButton = createButton('Capture Image');
  captureButton.position(10, height + 10);
  captureButton.mousePressed(captureFrame);
}
function draw(){
    blur();
}

function blur() {
  image(capture, 0, 0, width, height);

  if (faces) {
    strokeWeight(2);
    stroke(255);
    noFill();

    for (var i = 0; i < faces.length; i++) {
      var face = faces[i];
      if (face[4] > 4) {
        // Blur the detected face region
        var faceRegion = get(face[0], face[1], face[2], face[3]);
        faceRegion.filter(BLUR, 10); // Adjust the blur amount as needed
        image(faceRegion, face[0], face[1], face[2], face[3]);
      }
    }
  }
}

// Callback function for the capture button
function captureFrame() {
  // Capture the current frame from the webcam
  capture.loadPixels();
  var capturedImage = createImage(width, height);
  capturedImage.copy(capture, 0, 0, width, height, 0, 0, width, height);

  // Perform face detection on the captured image
  faces = detector.detect(capturedImage.canvas);
}


//var detector;
//var classifier = objectdetect.frontalface;
//var capture;
//var faces;
//var snapshotImage;
//
//function setup() {
//  createCanvas(640, 480); // Use standard values for width and height
//  pixelDensity(1);
//  capture = createCapture(VIDEO);
//  capture.size(640, 480); // Use standard values for width and height
//  capture.hide();
//
//  var scaleFactor = 1.2;
//  detector = new objectdetect.detector(width, height, scaleFactor, classifier);
//
//  // Create buttons for capturing and loading images
//  var captureButton = createButton('Capture Image');
//  captureButton.position(10, height + 10);
//  captureButton.mousePressed(captureFrame);
//
//  var loadButton = createButton('Load Image');
//  loadButton.position(120, height + 10);
//  loadButton.mousePressed(loadImageFromInput);
//}
//
//function draw() {
//  if (snapshotImage) {
//    // Scale the image to 160 x 120 pixels
//    image(snapshotImage, 0, 0, 160, 120);
//
//    // Perform face detection on the scaled image
//    faces = detector.detect(snapshotImage.canvas);
//
//    // Draw the face detection results in a new grid
//    drawFacesGrid();
//  }
//}
//
//function drawFacesGrid() {
//  if (faces) {
//    strokeWeight(2);
//    stroke(255);
//    noFill();
//
//    var gridSize = 20;
//    for (var i = 0; i < faces.length; i++) {
//      var face = faces[i];
//      if (face[4] > 4) {
//        var x = map(face[0], 0, snapshotImage.width, 0, width - gridSize);
//        var y = map(face[1], 0, snapshotImage.height, 0, height - gridSize);
//
//        // Blur the detected face region
//        var faceRegion = snapshotImage.get(face[0], face[1], face[2], face[3]);
//        faceRegion.filter(BLUR, 10); // Adjust the blur amount as needed
//        image(faceRegion, x, y, gridSize, gridSize);
//      }
//    }
//  }
//}
//
//// Callback function for the capture button
//function captureFrame() {
//  // Capture the current frame from the webcam
//  capture.loadPixels();
//  snapshotImage = createImage(capture.width, capture.height);
//  snapshotImage.copy(capture, 0, 0, capture.width, capture.height, 0, 0, capture.width, capture.height);
//}
//
//// Callback function for the load button
//function loadImageFromInput() {
//  // Create an input element for loading an image
//  var input = createFileInput(handleFile);
//  input.position(240, height + 10);
//}
//
//// Callback function for handling the loaded image
//function handleFile(file) {
//  if (file.type === 'image') {
//    snapshotImage = loadImage(file.data, function () {
//      snapshotImage.resize(160, 120);
//    });
//  }
//}
