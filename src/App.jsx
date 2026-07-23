const sendMessage = async () => {

  if (!message) return;

  const userMessage = {
    role: "user",
    text: message
  };

  setChats((prev) => [...prev, userMessage]);

  const requestBody = {
    message,
    history: chats
  };

  let success = false;

  for (let i = 0; i < 3; i++) {
    try {

      const response = await API.post("/api/chat", requestBody);

      const aiMessage = {
        role: "ai",
        text: response.data.reply
      };

      setChats((prev) => [...prev, aiMessage]);

      success = true;
      break;

    } catch (err) {

      // 10 second wait, then retry
      await new Promise(resolve => setTimeout(resolve, 10000));

    }
  }

  if (!success) {
    setChats((prev) => [
      ...prev,
      {
        role: "ai",
        text: "Server is waking up. Please try again after a few seconds."
      }
    ]);
  }

  setMessage("");
};