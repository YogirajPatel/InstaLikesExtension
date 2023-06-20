// chrome.runtime.onInstalled.addListener(function() {
//     chrome.storage.local.set({ extensionEnabled: true });
//   });

//   chrome.runtime.onStartup.addListener(function() {
//     chrome.storage.local.get('extensionEnabled', function(data) {
//       if (data.extensionEnabled) {
//         enableExtension();
//       } else {
//         disableExtension();
//       }
//     });
//   });

//   function enableExtension() {
//     chrome.tabs.query({ url: 'https://www.instagram.com/*' }, function(tabs) {
//       tabs.forEach(tab => {
//         chrome.scripting.executeScript({
//           target: { tabId: tab.id },
//           function: hideClass,
//         });
//       });
//     });

//     chrome.storage.local.set({ extensionEnabled: true });
//   }

//   function disableExtension() {
//     chrome.tabs.query({ url: 'https://www.instagram.com/*' }, function(tabs) {
//       tabs.forEach(tab => {
//         chrome.scripting.executeScript({
//           target: { tabId: tab.id },
//           function: showClass,
//         });
//       });
//     });

//     chrome.storage.local.set({ extensionEnabled: false });
//   }

//   function hideClass() {
//     const observer = new MutationObserver(function(mutationsList) {
//       for (const mutation of mutationsList) {
//         if (mutation.type === 'childList') {
//           const newLikes = document.getElementsByClassName('_ae5q');
//           for (const like of newLikes) {
//             like.style.display = 'none';
//           }
//           const newElements = document.getElementsByClassName('_ae5p');
//           for (const element of newElements) {
//             element.style.display = 'none';
//           }
//         }
//       }
//     });

//     const config = { childList: true, subtree: true };
//     observer.observe(document.body, config);

//     const existingLikes = document.getElementsByClassName('_ae5q');
//     for (const like of existingLikes) {
//       like.style.display = 'none';
//     }
//     const existingElements = document.getElementsByClassName('_ae5p');
//     for (const element of existingElements) {
//       element.style.display = 'none';
//     }
//   }

//   function showClass() {
//     const existingLikes = document.getElementsByClassName('_ae5q');
//     for (const like of existingLikes) {
//       like.style.display = '';
//     }
//     const existingElements = document.getElementsByClassName('_ae5p');
//     for (const element of existingElements) {
//       element.style.display = '';
//     }
//   }


// chrome.runtime.onInstalled.addListener(function () {
//   chrome.storage.local.set({ extensionEnabled: true }, function () {
//     enableOrDisableExtension();
//   });
// });

// chrome.runtime.onStartup.addListener(function () {
//   enableOrDisableExtension();
// });

// function enableOrDisableExtension() {
//   chrome.storage.local.get("extensionEnabled", function (data) {
//     if (data.extensionEnabled) {
//       enableExtension();
//     } else {
//       disableExtension();
//     }
//   });
// }

// function enableExtension() {
//   chrome.tabs.query({ url: "https://www.instagram.com/*" }, function (tabs) {
//     tabs.forEach((tab) => {
//       chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         function: hideClass,
//       });
//     });
//   });

//   chrome.storage.local.set({ extensionEnabled: true });
// }

// function disableExtension() {
//   chrome.tabs.query({ url: "https://www.instagram.com/*" }, function (tabs) {
//     tabs.forEach((tab) => {
//       chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         function: showClass,
//       });
//     });
//   });

//   chrome.storage.local.set({ extensionEnabled: false });
// }

// function hideClass() {
//   const observer = new MutationObserver(function (mutationsList) {
//     for (const mutation of mutationsList) {
//       if (mutation.type === "childList") {
//         const newLikes = document.getElementsByClassName("_ae5q");
//         for (const like of newLikes) {
//           like.style.display = "none";
//         }
//         const newElements = document.getElementsByClassName("_ae5p");
//         for (const element of newElements) {
//           element.style.display = "none";
//         }
//       }
//     }
//   });

//   const config = { childList: true, subtree: true };
//   observer.observe(document.body, config);

//   const existingLikes = document.getElementsByClassName("_ae5q");
//   for (const like of existingLikes) {
//     like.style.display = "none";
//   }
//   const existingElements = document.getElementsByClassName("_ae5p");
//   for (const element of existingElements) {
//     element.style.display = "none";
//   }
// }

// function showClass() {
//   const existingLikes = document.getElementsByClassName("_ae5q");
//   for (const like of existingLikes) {
//     like.style.display = "";
//   }
//   const existingElements = document.getElementsByClassName("_ae5p");
//   for (const element of existingElements) {
//     element.style.display = "";
//   }
// }



chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({ extensionEnabled: true });
});

chrome.runtime.onStartup.addListener(function() {
  enableOrDisableExtension();
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url.startsWith('https://www.instagram.com/')) {
    enableOrDisableExtension();
  }
});

function enableOrDisableExtension() {
  chrome.storage.local.get('extensionEnabled', function(data) {
    if (data.extensionEnabled) {
      enableExtension();
    } else {
      disableExtension();
    }
  });
}

function enableExtension() {
  chrome.tabs.query({ url: 'https://www.instagram.com/*' }, function(tabs) {
    tabs.forEach(tab => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: hideClass,
      });
    });
  });

  chrome.storage.local.set({ extensionEnabled: true });
}

function disableExtension() {
  chrome.tabs.query({ url: 'https://www.instagram.com/*' }, function(tabs) {
    tabs.forEach(tab => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: showClass,
      });
    });
  });

  chrome.storage.local.set({ extensionEnabled: false });
}

function hideClass() {
  const observer = new MutationObserver(function(mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const newLikes = document.getElementsByClassName('_ae5q');
        for (const like of newLikes) {
          like.style.display = 'none';
        }
        const newElements = document.getElementsByClassName('_ae5p');
        for (const element of newElements) {
          element.style.display = 'none';
        }
      }
    }
  });

  const config = { childList: true, subtree: true };
  observer.observe(document.body, config);

  const existingLikes = document.getElementsByClassName('_ae5q');
  for (const like of existingLikes) {
    like.style.display = 'none';
  }
  const existingElements = document.getElementsByClassName('_ae5p');
  for (const element of existingElements) {
    element.style.display = 'none';
  }
}

function showClass() {
  const existingLikes = document.getElementsByClassName('_ae5q');
  for (const like of existingLikes) {
    like.style.display = '';
  }
  const existingElements = document.getElementsByClassName('_ae5p');
  for (const element of existingElements) {
    element.style.display = '';
  }
}
