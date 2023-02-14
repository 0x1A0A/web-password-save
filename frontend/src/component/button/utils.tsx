import React from "react";

interface SaveButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function SaveButton(props: SaveButtonProps) {
  return (
    <button
      className="rounded-md bg-sky-400 px-4 py-1 text-slate-100 hover:bg-sky-500"
      onClick={props.onClick}
    >
      Save
    </button>
  );
}

interface CancleButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function CancleButton(props: CancleButtonProps) {
  return (
    <button
      className="rounded-md bg-slate-400 px-4 py-1 text-slate-100 hover:bg-slate-300"
      onClick={props.onClick}
    >
      cancle
    </button>
  );
}

function EditButton() {
  return (
    <button className="rounded-md bg-slate-400 px-4 py-1 text-slate-100 hover:bg-slate-300">
      Edit
    </button>
  );
}

export { SaveButton, CancleButton, EditButton };
