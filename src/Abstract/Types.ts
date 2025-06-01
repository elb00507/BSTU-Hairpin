export type TTypeGood = {
	id: number;
	title: string;
	typeFields: {
		id: number;
		title: string;
		type: number;
		current: number;
		param: string;
	}[];
};

export type TTypesGoods = {
	types: TTypeGood[];
};

export type TValueField = [number, number | string | Date];
export type TTypeField = [number, string, number, number, string];

export type TGoodResponse = {
	count: number;
	codeCDB: number;
	id: number;
	title: string;
	orderDB: number;
	price: number;
	photoLink: string;
	slider: string[];
	valueFields: TValueField[];
	typeFields: TTypeField[];
};

export type TGoodsResponse = {
	goods: TGoodResponse[];
};

export type TGood = TGoodResponse & {
	fields: Record<string, string | number | Date>;
};
