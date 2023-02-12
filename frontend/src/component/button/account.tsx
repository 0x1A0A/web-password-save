import React from "react";

interface AccountProps {
  name: String;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  state?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Account(props: AccountProps) {
  return (
    <div
      className="group mx-4 flex h-24 items-center justify-center transition-all"
      onClick={()=>props.state?.(true)}
    >
      <div className="flex h-20 w-16 grow items-center justify-center rounded-lg bg-slate-100 p-2 shadow-md transition-all ease-in-out hover:border-solid hover:border-sky-600 group-hover:mb-4">
        <span className="text-lg font-black transition-all group-hover:text-[1.5rem]">
          {props.name}
        </span>
      </div>
    </div>
  );
}

interface AccountAddProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function AccountAdd(props: AccountAddProps) {
  return (
    <div
      className="group mx-4 flex h-24 items-center justify-center opacity-60 transition-all hover:opacity-80"
      onClick={props.onClick}
    >
      <div className="flex h-20 w-16 grow items-center justify-center rounded-lg border-2 border-dashed border-slate-500 p-2 transition-all hover:border-solid hover:border-sky-600">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-500 transition-all group-hover:border-sky-600">
          <span
            aria-hidden="true"
            className="absolute h-0.5 w-1/2 rounded-full bg-slate-500 group-hover:bg-sky-600"
          ></span>
          <span
            aria-hidden="true"
            className="absolute h-0.5 w-1/2 rotate-90 rounded-full bg-slate-500 group-hover:bg-sky-600"
          ></span>
        </div>
      </div>
    </div>
  );
}
