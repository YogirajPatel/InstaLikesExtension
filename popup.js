document.addEventListener("DOMContentLoaded", function () {
  var toggleButton = document.getElementById("toggleButton");

  
  chrome.storage.local.get("extensionEnabled", function (data) {
    if (data.extensionEnabled === undefined || data.extensionEnabled) {
      toggleButton.innerText = "Disable Extension";
      enableExtension();
    } else {
      toggleButton.innerText = "Enable Extension";
      disableExtension();
    }
  });

  toggleButton.addEventListener("click", function () {
    chrome.storage.local.get("extensionEnabled", function (data) {
      if (data.extensionEnabled === undefined || data.extensionEnabled) {
        disableExtension();
      } else {
        enableExtension();
      }
    });
  });

  function enableExtension() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: hideClass,
      });
    });

    chrome.storage.local.set({ extensionEnabled: true });

    toggleButton.innerText = "Disable Extension";
  }

  function disableExtension() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: showClass,
      });
    });

    chrome.storage.local.set({ extensionEnabled: false });

    toggleButton.innerText = "Enable Extension";
  }
});

function hideClass() {
  const observer = new MutationObserver(function (mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        const newLikes = document.getElementsByClassName("_ae5q");
        for (const like of newLikes) {
          like.style.display = "none";
        }
        const newElements = document.getElementsByClassName("_ae5p");
        for (const element of newElements) {
          element.style.display = "none";
        }
      }
    }
  });

  const config = { childList: true, subtree: true };
  observer.observe(document.body, config);

  const existingLikes = document.getElementsByClassName("_ae5q");
  for (const like of existingLikes) {
    like.style.display = "none";
  }
  const existingElements = document.getElementsByClassName("_ae5p");
  for (const element of existingElements) {
    element.style.display = "none";
  }
}

function showClass() {
  const existingLikes = document.getElementsByClassName("_ae5q");
  for (const like of existingLikes) {
    like.style.display = "";
  }
  const existingElements = document.getElementsByClassName("_ae5p");
  for (const element of existingElements) {
    element.style.display = "";
  }
}

// Automatically apply extension functionality when the tab is updated or refreshed
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  chrome.storage.local.get("extensionEnabled", function (data) {
    if (data.extensionEnabled) {
      enableExtension();
    } else {
      disableExtension();
    }
  });
});
