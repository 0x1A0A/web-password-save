import React, { useEffect } from "react";

interface UserPayload {
  name: string;
  password: string;
}

function user_valid(u: UserPayload) {
  return u.name != "" && u.password != "";
}

export default function Login() {
  const SERVER = process.env.REACT_APP_SERVER;
  const PORT = process.env.REACT_APP_PORT;

  const [payload, setPayload] = React.useState<UserPayload>({
    name: "",
    password: "",
  });

  const inputChangeHandler = function (key: keyof UserPayload) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setPayload({ ...payload, [key]: event.target.value });
    };
  };

  const loginClick = function () {
    return (event: React.MouseEvent<HTMLButtonElement>) => {
      if (user_valid(payload)) {
        const uri = encodeURI(`http://${SERVER}:${PORT}/auth`);

        const requestOption = {
          method: "POST",
          header: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        };

        fetch(uri, requestOption)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
          });
      }
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
            onChange={inputChangeHandler("name")}
            placeholder="Username"
            className="rounded bg-transparent py-1 px-1 transition-all focus:outline-none focus:ring-2 focus:ring-green-500"
          ></input>
          <input
            type="password"
            onChange={inputChangeHandler("password")}
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
