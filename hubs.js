import { d as detect } from "./vendor.js";
import "three";
var NetworkedHelloWorld_vue_vue_type_style_index_0_scoped_true_lang = "";
var top = "";
var room = "";
console.log("User Agent: " + navigator.userAgent);
const browser = detect();
if (browser) {
  if (browser.os == "Linux") {
    if (navigator.userAgent.search(/OculusBrowser/) >= 0) {
      browser.name = "oculus";
      if (navigator.userAgent.search(/Quest 2/) >= 0) {
        browser.os = "LinuxQuest2";
      } else {
        browser.os = "LinuxQuest";
      }
    }
  }
  console.log("Running on OS '" + browser.os + "' in browser '" + browser.name + "' version '" + browser.version + "'");
} else {
  console.log("Browser Detect didn't work?!");
}
async function logAndFollow(id, url) {
  await window.APP.scene.systems["data-logging"].logLink(id, url);
  if (url.length > 0) {
    await window.APP.utils.handleExitTo2DInterstitial(false, () => {
    }, true);
    window.open(url, "_blank");
  }
}
window.APP.utils.followLinkClick = function(event) {
  var url = "";
  event.preventDefault();
  if (event.target instanceof HTMLElement) {
    if (event.target instanceof HTMLAnchorElement) {
      url = event.target.href;
    } else if (event.target instanceof HTMLSpanElement) {
      let child = event.target.childNodes[0];
      if (child instanceof HTMLAnchorElement) {
        url = child.href;
      }
    }
    logAndFollow(event.target.id, url);
  }
};
var HelloWorld_vue_vue_type_style_index_0_scoped_true_lang = "";
var App_vue_vue_type_style_index_0_scoped_true_lang$1 = "";
var App_vue_vue_type_style_index_0_scoped_true_lang = "";
