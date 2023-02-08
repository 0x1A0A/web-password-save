import React, { useEffect } from "react";

export default function Home() {
  return (
    <div className="relative grid  h-screen w-screen grid-cols-[260px_1fr] grid-rows-[64px_48px_1fr] bg-slate-300">
      <nav className="col-start-1 col-end-2 row-start-1 row-end-4 overflow-auto bg-neutral-800">
        <div className="flex flex-col gap-1 p-2">
          <div className="group flex h-14">
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
        </div>
      </nav>
      <header className="col-start-2 col-end-3 bg-sky-700"></header>
      <div className="col-start-2 col-end-3 row-start-2 row-end-3 bg-sky-900"></div>
      <main className="overflow-auto">
        <div className="m-10 grid grid-cols-4 items-center justify-center gap-4">
          <div className="group mx-4 flex h-24 items-center justify-center opacity-60 hover:opacity-80 transition-all">
            <div className="flex grow items-center justify-center rounded-lg bg-slate-400 p-2 group-hover:shadow-md transition-all">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-300 transition-all group-hover:h-20 group-hover:w-20">
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
        </div>
      </main>
    </div>
  );
}
