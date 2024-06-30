
import {
    SET_LOADER,
    REMOVE_LOADER
} from './types';

const setGlobalLoader = (status) => {
    return {
        type: status === true ? SET_LOADER : REMOVE_LOADER
    };
};

export default setGlobalLoader;