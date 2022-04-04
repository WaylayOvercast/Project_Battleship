import { atom } from 'recoil';


    const storage = atom({
        key: 'store',
        default: {isLogged: false}
    })



export default storage