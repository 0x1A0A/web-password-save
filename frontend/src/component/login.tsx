import React, { useRef } from "react";

export default function Login() {
  const SERVER = process.env.REACT_APP_SERVER;
  const PORT = process.env.REACT_APP_PORT;

  const [usernameRef, passwordRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const loginClick = function () {
    return (_event: React.MouseEvent<HTMLButtonElement>) => {
      const uri = encodeURI(`http://${SERVER}:${PORT}/auth`);

      const payload = {
        name: usernameRef.current?.value ?? "",
        password: passwordRef.current?.value ?? "",
      };

      const requestOption = {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      };

      fetch(uri, requestOption)
        .then((res) => res.json())
        .then((data) => {
          if (data.Ok) {
            localStorage.setItem("passman-jwt-auth", data.Ok.token);
            window.location.reload();
          }
        });
    };
  };

  return (
    <div
      id="login-page"
      className="fixed z-10 flex h-screen w-screen items-center justify-center bg-green-300"
    >
      <div className="flex h-auto w-96 flex-col gap-2 px-5 py-5">
        <div className="pl-4 text-xl font-bold">PASSWORD MAN</div>
        <div className="flex h-auto flex-col gap-2 rounded-xl bg-slate-50 px-5 py-5 shadow-md">
          <input
            type="text"
            ref={usernameRef}
            placeholder="Username"
            className="rounded bg-transparent py-1 px-1 transition-all focus:outline-none focus:ring-2 focus:ring-green-500"
          ></input>
          <input
            type="password"
            ref={passwordRef}
            placeholder="Password"
            className="rounded bg-transparent py-1 px-1 transition-all focus:outline-none focus:ring-2 focus:ring-green-500"
          ></input>
          <hr></hr>
          <button
            onClick={loginClick()}
            className="self-end rounded-full bg-green-500 px-3 py-1 transition-all hover:bg-green-300 hover:px-4"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
