import { Data } from "./data";

interface GroupPayload {
  name: string;
  desc?: string;
}

interface GroupsData {
	id: string;
	desc: string;
	name: string;
	data: Data[];
}

export type { GroupPayload, GroupsData };
