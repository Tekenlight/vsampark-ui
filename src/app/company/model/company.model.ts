import { Address } from "./address.model";

export interface Company{
    cin: string,
	company_name: string,
	company_short_name:string,
	corporate_parent_id:number,
	company_category: string,
	company_sub_category:string,
	company_class:  string,
    pan: string,
	tan: string,
	tin: number
	gstin:string,
	date_of_incorporation:Date,
	registered_address: Address,
    corporate_address: Address,
	country: string,
	email_id: string,
	company_email_id: string,
	contact_number:string,
	company_status:string,
	bank_account_number:number
	bank_branch:string,
	bank_ifsc_code:string,
	created_by?:Date
	modified_by?: string,
	modified_on?:Date,
	is_deleted?: boolean
	record_version_number?:number

}