import React from "react";

interface GroupProps {
  name: String;
  select?: boolean;
}

export default function Group({ name, select }: GroupProps) {
  return (
    <div className="group flex h-12">
      <div
        data-select={select ?? false}
        className="flex grow items-center rounded-lg p-2 transition-all group-hover:bg-neutral-600 data-[select=true]:bg-neutral-600"
      >
        <div>
          <span className="text-lg font-light text-slate-100"> {name} </span>
        </div>
      </div>
    </div>
  );
}

interface GroupAddProps {
  state?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function GroupAdd(props: GroupAddProps) {
  return (
    <div className="group flex h-14" onClick={() => props.state?.(true)}>
      <div className="flex grow items-center justify-center rounded-lg p-2">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-300 transition-all group-hover:h-12 group-hover:w-12">
          <span
            aria-hidden="true"
            className="absolute h-0.5 w-1/2 rounded-full bg-slate-300"
          ></span>
          <span
            aria-hidden="true"
            className="absolute h-0.5 w-1/2 rotate-90 rounded-full bg-slate-300"
          ></span>
        </div>
      </div>
    </div>
  );
}
