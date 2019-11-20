import { IContext } from '../types';

export default interface IScene {
	/**
	 * The unique name of the scene
	 */
	slug: string;

	/**
	 * Enter handler for the scene
	 */
	enterHandler(context: IContext): any;

	/**
	 * Leave handler for the scene
	 */
	leaveHandler(context: IContext): any;
}
