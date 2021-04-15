import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { encryptTransform } from 'redux-persist-transform-encrypt';

// const encryptor = encryptTransform({
//   secretKey: 'encryptor',
//   onError(error) {
//     console.error(error)
//   },
// });


export const getPersistedReducer = (key, reducer, whitelist=null) => {
  const persistConfig = {
    key,
    storage,
    whitelist,
    // transforms: [encryptor]
  };
  return persistReducer(persistConfig, reducer)
}