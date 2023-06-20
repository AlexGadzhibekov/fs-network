const endpoint = "http://localhost:8080/api";

let user = JSON.parse(localStorage.getItem("user") || "null");

const auth = async () => {
  try {
    const response = await fetch(`${endpoint}/user/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "feff",
        password: "fewfwfe",
      }),
    });

    if (!response.ok) {
      throw new Error("server error");
    }

    const data = await response.json();

    user = data;

    localStorage.setItem("user", JSON.stringify(user));

    const event = new CustomEvent("userChanged", { detail: data });
    window.dispatchEvent(event);
  } catch (error) {
    console.log("error:", error);
  }
};

const logOut = () => {
  user = null;
  localStorage.removeItem("user");

  const event = new CustomEvent("userChanged", { detail: user });
  window.dispatchEvent(event);
};

export { user, auth, logOut };
