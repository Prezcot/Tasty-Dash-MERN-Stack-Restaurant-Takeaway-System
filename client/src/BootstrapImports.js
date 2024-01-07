if (process.env.NODE_ENV !== "test") {
  //we are able to use require here because we are essentially using react transform
  //commonjs which converts ES6 into CommonJS...which should be used rarely but is necessary in this case.
  require("bootstrap/dist/css/bootstrap.min.css");
  require("bootstrap/dist/js/bootstrap.bundle.min.js");
}
