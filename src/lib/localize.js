import test from "./test.json";

function localizer(localization) {
  const _this = this;

  this.localization = Object.keys(localization).reduce(
    (tempLocalization, key) => {
      if (typeof localization[key] === "string") {
        tempLocalization[key] = localization[key];
      }
      return tempLocalization;
    },
    {}
  );

  this.canLocalize = function(string) {
    return _this.localization.hasOwnProperty(string);
  };

  this.localize = function(string) {
    if (!_this.canLocalize(string)) {
      // eslint-disable-next-line no-console
      console.warn(`No localization string for: ${string}`);
      return string;
    }
    return this.localization[string];
  };
}

function getLocalizer(env) {
  return new localizer(env);
}

export default getLocalizer(test).localize;
