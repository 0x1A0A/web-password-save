import React, { useEffect, useState } from "react";
import { Account, AccountAdd, GroupAdd, Group, Logout } from "./button";
import { AccountCreate, GroupCreate, AccountCard } from "./popup";
import { GroupPayload, GroupsData } from "../models";

import { Buffer } from "buffer";
import { Chacha20 } from "ts-chacha20";

export default function Home() {
  const SERVER = process.env.REACT_APP_SERVER;
  const PORT = process.env.REACT_APP_PORT;
  const uri = encodeURI(`http://${SERVER}:${PORT}`);

  const [view, setView] = useState<boolean>(false);
  const [cardCreate, setCardCreate] = useState<boolean>(false);
  const [groupCreate, setGroupCreate] = useState<boolean>(false);

  const [dataList, setDataList] = useState<GroupsData[]>([]);
  const [groupSelect, setGroupSelect] = useState<number>(0);

  let select_acc = 0;

  const getDatas = async function () {
    const requestOption = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("passman-jwt-auth")}`,
        "Content-Type": "application/json",
      },
    };

    fetch(`${uri}/groups_data`, requestOption)
      .then((res) => res.json())
      .then((data) => {
        if (data.Ok) {
          const hash = sessionStorage.getItem("passman-hash") ?? "";

          if (hash === "") {
            Logout();
            return;
          }

          const hashbuff = Buffer.from(hash, "base64");

          const d: GroupsData[] = data.Ok;

          d.forEach((v, i) => {
            v.data.forEach((vv, ii) => {
              let decoded = Buffer.from(
                new Chacha20(
                  hashbuff,
                  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
                ).decrypt(Buffer.from(vv.data, "base64"))
              ).toString();

              let [acc, usr, pwd, desc] = decoded.split(".");

              vv.account = window.atob(acc);
              vv.name = window.atob(usr);
              vv.password = window.atob(pwd);
              vv.desc = window.atob(desc);
            });
          });

          setDataList(d);
        }
      });
  };

  const createGroup = async function (payload: GroupPayload) {
    const requestOption = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("passman-jwt-auth")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    fetch(`${uri}/group`, requestOption)
      .then((res) => res.json())
      .then((data) => {
        if (data.Ok) {
          const res: GroupsData = {
            id: data.Ok.id,
            desc: "",
            name: data.Ok.name,
            data: [],
          };
          setDataList([...dataList, res]);
          setGroupCreate(false);
        }
      });
  };

  const createData = async function (data: string) {
    const hash = sessionStorage.getItem("passman-hash") ?? "";

    if (hash === "") {
      Logout();
      return;
    }

    let [acc, usr, pwd, desc] = data.split(".");

    data = Buffer.from(
      new Chacha20(
        Buffer.from(hash, "base64"),
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
      ).encrypt(Buffer.from(data))
    ).toString("base64");

    const payload = {
      data: data,
      group_id: dataList[groupSelect].id,
    };

    const requestOption = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("passman-jwt-auth")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    fetch(`${uri}/data`, requestOption)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.Ok) {
          dataList[groupSelect].data.push({
            data: data,
            id: data.Ok,
            account: window.atob(acc),
            name: window.atob(usr),
            password: window.atob(pwd),
            desc: window.atob(desc),
          });
          setDataList(dataList);
          setCardCreate(false);
        }
      });
  };

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div className="relative grid h-screen w-screen grid-cols-[260px_1fr] grid-rows-[64px_48px_1fr] bg-slate-300">
      <nav className="col-start-1 col-end-2 row-start-1 row-end-4 overflow-auto bg-neutral-800">
        <div className="flex flex-col gap-1 p-2">
          {dataList.map((e, i) => (
            <Group
              name={e.name}
              key={e.name}
              select={i === groupSelect}
              onClick={() => {
                setGroupSelect(i);
              }}
            ></Group>
          ))}
          <GroupAdd state={setGroupCreate}></GroupAdd>
        </div>
      </nav>
      <header className="relative col-start-2 col-end-3 flex items-center bg-sky-700">
        <Logout></Logout>
      </header>
      <div className="col-start-2 col-end-3 row-start-2 row-end-3 bg-sky-900"></div>
      <main className="overflow-auto">
        <div className="m-10 grid grid-cols-4 items-center justify-center gap-4">
          {dataList[groupSelect]?.data.map((v, i) => (
            <Account
              name={v.name}
              key={i}
              onClick={(_e) => {
                select_acc = i;
                setView(true);
              }}
            ></Account>
          ))}
          <AccountAdd onClick={(_e) => setCardCreate(true)} />
        </div>
      </main>
      {view && (
        <AccountCard
          account={dataList[groupSelect]?.data[select_acc]?.account}
          name={dataList[groupSelect]?.data[select_acc]?.name}
          password={dataList[groupSelect]?.data[select_acc]?.password}
          state={setView}
        ></AccountCard>
      )}
      {cardCreate && (
        <AccountCreate
          group={dataList[groupSelect]?.name}
          state={setCardCreate}
          callback={createData}
        ></AccountCreate>
      )}
      {groupCreate && (
        <GroupCreate
          state={setGroupCreate}
          callback={createGroup}
        ></GroupCreate>
      )}
    </div>
  );
}
