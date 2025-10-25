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
	slider: string[];
	title: string;
	orderDB: number;
	price: number;
	photoLink: string;
	valueFields: TValueField[];
	typeFields: TTypeField[];
};

export type TCustomer = {
	id: string;
	name: string;
	email: string;
	operatorType: string;
	mobile: string;
	adress: string;
};

export type TRegistrationResponse = {
	message: string;
	customerId: string;
	error: {
		message: string;
		code: number;
	};
};

export type TIdentificationResponse = {
	message: string;
	customer: TCustomer;
	error: {
		message: string;
		code: number;
	};
};

export type TGoodsResponse = {
	goods: TGoodResponse[];
};

export type TGood = TGoodResponse & {
	fields: Record<string, string | number | Date>;
};
