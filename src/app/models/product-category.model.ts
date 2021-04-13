export interface ProductCategoryModel{
	id: number,
	name: String,
	img_url: String,
	price: string,
	price_discount: string, 
	editor: EditorMode[],
}
export interface EditorMode{
	image: String,
	order: number,
}