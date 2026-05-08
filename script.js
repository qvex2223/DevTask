const API_BASE_URL = "https://api.green-api.com";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("getSettingsButton").addEventListener("click", getSettings);
  document.getElementById("getStateInstanceButton").addEventListener("click", getStateInstance);
  document.getElementById("sendMessageButton").addEventListener("click", sendMessage);
  document.getElementById("sendFileButton").addEventListener("click", sendFileByUrl);
});

function getCredentials() {
  const idInstance = document.getElementById("idInstance").value.trim();
  const apiTokenInstance = document.getElementById("apiTokenInstance").value.trim();

  if (!idInstance || !apiTokenInstance) {
    throw new Error("Заполните idInstance и ApiTokenInstance");
  }

  return { idInstance, apiTokenInstance };
}

function showResponse(data) {
  const responseOutput = document.getElementById("responseOutput");

  if (typeof data === "string") {
    responseOutput.value = data;
    return;
  }

  responseOutput.value = JSON.stringify(data, null, 2);
}

function formatChatId(phone) {
  const rawValue = phone.trim();

  if (!rawValue) {
    throw new Error("Заполните номер телефона");
  }

  if (rawValue.endsWith("@c.us")) {
    return rawValue;
  }

  const normalizedPhone = rawValue.replace(/\D/g, "");

  if (!normalizedPhone) {
    throw new Error("Номер телефона должен содержать цифры");
  }

  return `${normalizedPhone}@c.us`;
}

function getFileNameFromUrl(fileUrl) {
  const parsedUrl = new URL(fileUrl);
  const fileName = parsedUrl.pathname.split("/").pop();

  if (!fileName) {
    throw new Error("Не удалось определить имя файла из URL");
  }

  return decodeURIComponent(fileName);
}

function setButtonsDisabled(isDisabled) {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.disabled = isDisabled;
  });
}

async function requestGreenApi(methodName, options = {}) {
  try {
    const { idInstance, apiTokenInstance } = getCredentials();
    const encodedIdInstance = encodeURIComponent(idInstance);
    const encodedToken = encodeURIComponent(apiTokenInstance);
    const url = `${API_BASE_URL}/waInstance${encodedIdInstance}/${methodName}/${encodedToken}`;

    setButtonsDisabled(true);

    const response = await fetch(url, options);
    const contentType = response.headers.get("content-type") || "";
    const responseData = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      showResponse({
        error: true,
        status: response.status,
        statusText: response.statusText,
        response: responseData
      });
      return null;
    }

    showResponse(responseData);
    return responseData;
  } catch (error) {
    showResponse({
      error: true,
      message: error.message
    });
    return null;
  } finally {
    setButtonsDisabled(false);
  }
}

async function getSettings() {
  await requestGreenApi("getSettings");
}

async function getStateInstance() {
  await requestGreenApi("getStateInstance");
}

async function sendMessage() {
  try {
    const phone = document.getElementById("chatIdMessage").value;
    const message = document.getElementById("message").value.trim();

    if (!message) {
      throw new Error("Заполните текст сообщения");
    }

    const body = {
      chatId: formatChatId(phone),
      message
    };

    await requestGreenApi("sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  } catch (error) {
    showResponse({
      error: true,
      message: error.message
    });
  }
}

async function sendFileByUrl() {
  try {
    const phone = document.getElementById("chatIdFile").value;
    const urlFile = document.getElementById("fileUrl").value.trim();

    if (!urlFile) {
      throw new Error("Заполните URL файла");
    }

    const body = {
      chatId: formatChatId(phone),
      urlFile,
      fileName: getFileNameFromUrl(urlFile)
    };

    await requestGreenApi("sendFileByUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  } catch (error) {
    showResponse({
      error: true,
      message: error.message
    });
  }
}
