import axios from 'axios';
import ApiRoute from '../../utils/apiRoutes';
import {
    USER_LOADED,
    USER_LOAD_ERROR,
} from './types';

/**
 * get user details
 */
export const getUserDetails = () => async (dispatch) => {
    try {
        const res = await axios.get(ApiRoute.getUserDetails);
        return res
    } catch (error) {
        console.log(error);
    }
};
