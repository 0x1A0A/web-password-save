import React, { useEffect, useRef, useState } from "react";
import { Account, AccountAdd, GroupAdd, Group, Logout } from "./button";
import { AccountCreate, GroupCreate, AccountCard } from "./popup";

export default function Home() {
  const [view, setView] = useState<boolean>(false);
  const [cardCreate, setCardCreate] = useState<boolean>(false);
  const [groupCreate, setGroupCreate] = useState<boolean>(false);
  return (
    <div className="relative grid h-screen w-screen grid-cols-[260px_1fr] grid-rows-[64px_48px_1fr] bg-slate-300">
      <nav className="col-start-1 col-end-2 row-start-1 row-end-4 overflow-auto bg-neutral-800">
        <div className="flex flex-col gap-1 p-2">
          <Group name="Facebook" select={true}></Group>
          <Group name="Google" select={false}></Group>
          <GroupAdd state={setGroupCreate}></GroupAdd>
        </div>
      </nav>
      <header className="relative col-start-2 col-end-3 flex items-center bg-sky-700">
        <Logout></Logout>
      </header>
      <div className="col-start-2 col-end-3 row-start-2 row-end-3 bg-sky-900"></div>
      <main className="overflow-auto">
        <div className="m-10 grid grid-cols-4 items-center justify-center gap-4">
          <Account name="Kasuga Romio" state={setView} />
          <Account name="" />
          <AccountAdd onClick={(_e) => setCardCreate(true)} />
        </div>
      </main>
      {view && (
        <AccountCard
          name="Kasuga Romio"
          account="yay"
          password="test"
          state={setView}
        ></AccountCard>
      )}
      {cardCreate && (
        <AccountCreate group="TEST" state={setCardCreate}></AccountCreate>
      )}
      {groupCreate && <GroupCreate state={setGroupCreate}></GroupCreate>}
    </div>
  );
}
