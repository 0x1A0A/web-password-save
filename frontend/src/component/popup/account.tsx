import React, { forwardRef, useRef, useState } from "react";
import { SaveButton, CancleButton, EditButton } from "../button";

interface TextInputProps {
  label: string;
  type?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return (
    <div className="flex overflow-hidden rounded-full bg-transparent ring-1 ring-neutral-200 focus-within:outline-none focus-within:ring-1 focus-within:ring-sky-400">
      <label className="h-full w-24 bg-neutral-200 px-3 py-1 ">
        {props.label}
      </label>
      <input
        className="grow bg-transparent px-2 focus:outline-none"
        ref={ref}
        type={props.type ?? "text"}
      ></input>
    </div>
  );
});

interface AccountCreateProps {
  group: string;
  state?: React.Dispatch<React.SetStateAction<boolean>>;
  callback?: (data: string) => Promise<void>;
}

const AccountCreate = function (props: AccountCreateProps) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const accountRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div
      className="fixed z-50 flex h-screen w-screen items-center justify-center bg-black/80 backdrop-blur"
      onClick={() => props.state?.(false)}
    >
      <div
        className="flex w-96 flex-col gap-2 rounded-md bg-slate-100 p-4 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-bold">
          ADD NEW ACCOUNT :{" "}
          <span className="from-neutral-400 font-light">{props.group}</span>
        </p>
        <TextInput label="Title" ref={accountRef}></TextInput>
        <TextInput label="Username" ref={usernameRef}></TextInput>
        <TextInput
          label="Password"
          type="password"
          ref={passwordRef}
        ></TextInput>
        <textarea
          className="resize-none rounded-md bg-transparent p-1 ring-1 ring-neutral-200 focus:outline-none focus:ring-1 focus:ring-sky-400"
          rows={4}
          placeholder="Description"
          ref={descRef}
        ></textarea>
        <div className="flex justify-end gap-2">
          <CancleButton onClick={() => props.state?.(false)}></CancleButton>
          <SaveButton
            onClick={() => {
              const usr = usernameRef.current?.value ?? "";
              const pwd = passwordRef.current?.value ?? "";
              const desc = descRef.current?.value ?? "";
              const acc = accountRef.current?.value ?? "";

              if (usr === "" || pwd === "" || acc === "") return;

              const data = `${window.btoa(acc)}.${window.btoa(
                usr
              )}.${window.btoa(pwd)}.${window.btoa(desc)}`;

              props.callback?.(data);
            }}
          ></SaveButton>
        </div>
      </div>
    </div>
  );
};

interface AccountCardProps {
  account?: string;
  name?: string;
  password?: string;
  desc?: string;
  state?: React.Dispatch<React.SetStateAction<boolean>>;
}

function AccountCard(props: AccountCardProps) {
  const [showpwd, setShowpwd] = useState<boolean>(false);
  return (
    <div
      className="fixed z-50 flex h-screen w-screen items-center justify-center bg-black/80 backdrop-blur"
      onClick={() => props.state?.(false)}
    >
      <div
        className="flex w-96 flex-col gap-2 rounded-md bg-slate-100 p-4 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-bold">{props.account}</p>
        <hr></hr>
        <div className="flex overflow-hidden rounded-full bg-transparent ring-1 ring-neutral-200 focus-within:outline-none focus-within:ring-1 focus-within:ring-sky-400">
          <label className="h-full w-24 bg-neutral-200 px-3 py-1">
            Username
          </label>
          <input
            className="grow bg-transparent px-2 focus:outline-none"
            value={props.name}
            disabled
          ></input>
        </div>
        <div className="flex overflow-hidden rounded-full bg-transparent ring-1 ring-neutral-200 focus-within:outline-none focus-within:ring-1 focus-within:ring-sky-400">
          <label className="h-full w-24 bg-neutral-200 px-3 py-1">
            Password
          </label>
          <input
            className="grow bg-transparent px-2 focus:outline-none"
            value={props.password}
            disabled
            type={showpwd ? "text" : "password"}
          ></input>
          <button
            className="mr-1 h-6 w-6 self-center rounded-full bg-slate-300"
            onClick={() => {
              setShowpwd(!showpwd);
            }}
          ></button>
        </div>
        <textarea
          className="resize-none rounded-md bg-transparent p-1 ring-1 ring-neutral-200 focus:outline-none focus:ring-1 focus:ring-sky-400"
          rows={4}
          placeholder="Description"
          value={props.desc}
          disabled
        ></textarea>
        <div className="flex justify-end gap-2">
          <EditButton></EditButton>
        </div>
      </div>
    </div>
  );
}

export { AccountCreate, AccountCard };
