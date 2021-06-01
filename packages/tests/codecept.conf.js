// const { setHeadlessWhen } = require("@codeceptjs/configure");

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
// setHeadlessWhen(process.env.HEADLESS);

// url: "http://157.90.227.17:3000",

exports.config = {
  tests: "./tests/*_test.js",
  output: "./output",
  helpers: {
    Puppeteer: {
      url: "http://localhost:3000",
      show: true,
      windowSize: "1366x768"
    }
  },
  include: {
    I: "./steps_file.js"
  },
  bootstrap: null,
  mocha: {},
  name: "tests",
  translation: "ru-RU",
  gherkin: {
    features: "./features/*.feature",
    steps: ["./step_defition/steps.js"]
  },
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
};
