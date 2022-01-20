/* eslint-disable import/no-extraneous-dependencies */
import { Request } from "express";

export interface IRequest extends Request {
	user: any;
}
