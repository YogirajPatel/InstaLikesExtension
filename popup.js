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
        const newElements2 = document.getElementsByClassName("_ac2a");
        for (const element of newElements2) {
          element.style.display = "none";
        }
        const newElements3 = document.getElementsByClassName("xieb3on");
        for (const element of newElements3) {
          element.style.display = "none";
        }
        const newElements4 = document.getElementsByClassName("_aa_c");
        for (const element of newElements4) {
          element.style.display = "none";
        }

        const newElements6 = document.getElementsByClassName("xrvj5dj");
        for (const element of newElements6) {
          element.style.display = "none";
          element.style.cursor = "";
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
  const existingElements2 = document.getElementsByClassName("_ac2a");
  for (const element of existingElements2) {
    element.style.display = "none";
  }
  const existingElements3 = document.getElementsByClassName("xieb3on");
  for (const element of existingElements3) {
    element.style.display = "none";
  }
  const existingElements4 = document.getElementsByClassName("_aa_c");
  for (const element of existingElements4) {
    element.style.display = "none";
  }

  const existingElements6 = document.getElementsByClassName("xrvj5dj");
  for (const element of existingElements6) {
    element.style.pointerEvents = "none";
    element.style.cursor = "";
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
  const existingElements2 = document.getElementsByClassName("_ac2a");
  for (const element of existingElements2) {
    element.style.display = "";
  }
  const existingElements3 = document.getElementsByClassName("xieb3on");
  for (const element of existingElements3) {
    element.style.display = "";
  }
  const existingElements4 = document.getElementsByClassName("_aa_c");
  for (const element of existingElements4) {
    element.style.display = "";
  }

  const existingElements6 = document.getElementsByClassName("xrvj5dj");
  for (const element of existingElements6) {
    element.style.display = "";
    element.style.cursor = "";
  }
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  chrome.storage.local.get("extensionEnabled", function (data) {
    if (data.extensionEnabled) {
      enableExtension();
    } else {
      disableExtension();
    }
  });
});
