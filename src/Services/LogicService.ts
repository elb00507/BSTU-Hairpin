import { Observer } from '../Abstract/Observer';
import { DBService } from './DBService';
import { TGood, TTypeField, TTypeGood, TValueField } from '../Abstract/Types';

export class LogicService extends Observer {
	constructor(private dbService: DBService) {
		super();
	}

	async getTypesGoods(): Promise<TTypeGood[]> {
		const data = await this.dbService.getTypesGoods();
		return data.types;
	}

	async updateGoodsByType(idGood: number): Promise<void> {
		const data = await this.dbService.getGoodsByType(idGood);
		const goods = data.goods;
		goods.forEach((good) => {
			(good as TGood)['fields'] = this.joinTypesWithValues(
				good.typeFields,
				good.valueFields
			);
		});
		this.disptach('updateGoodseOnPage', goods);
	}

	private joinTypesWithValues(
		arrTypes: TTypeField[],
		arrValues: TValueField[]
	): Record<string, string | number | Date> {
		const lenArr = arrTypes.length;
		const goodJson = {} as Record<string, string | number | Date>;
		for (let i = 0; i < lenArr; i++) {
			goodJson[arrTypes[i][1]] = arrValues[i][1];
		}
		return goodJson;
	}

	async updateAllGoods(): Promise<void> {
		const data = await this.dbService.getAllGoods();
		this.disptach('updateGoodseOnPage', data.goods);
	}
}
