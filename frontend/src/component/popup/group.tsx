import React, { useRef } from "react";
import { CancleButton, SaveButton } from "../button";
import { GroupPayload } from "../../models/group";

interface GroupCreateProps {
  state?: React.Dispatch<React.SetStateAction<boolean>>;
  callback?: (payload: GroupPayload) => Promise<void>;
}

export default function GroupCreate(props: GroupCreateProps) {
  const groupname = useRef<HTMLInputElement>(null);

  return (
    <div
      className="fixed z-50 flex h-screen w-screen items-center justify-center bg-black/80 backdrop-blur"
      onClick={() => props.state?.(false)}
    >
      <div
        className="flex w-96 flex-col gap-2 rounded-md bg-slate-100 p-4 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-bold">ADD NEW GROUP</p>
        <hr></hr>
        <div className="flex overflow-hidden rounded-full bg-transparent ring-1 ring-neutral-200 focus-within:outline-none focus-within:ring-1 focus-within:ring-sky-400">
          <label className="h-full bg-neutral-200 px-3 py-1">Group Name </label>
          <input
            className="grow bg-transparent px-2 focus:outline-none"
            ref={groupname}
          ></input>
        </div>
        <div className="flex justify-end gap-2">
          <CancleButton onClick={() => props.state?.(false)}></CancleButton>
          <SaveButton
            onClick={() => {
              const payload: GroupPayload = {
                name: groupname.current?.value ?? " ",
              };
              props.callback?.(payload);
            }}
          ></SaveButton>
        </div>
      </div>
    </div>
  );
}
