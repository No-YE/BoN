import { types } from 'mobx-state-tree';


export default types
  .model({
    id: types.integer,
    email: types.string,
    role: types.enumeration(['admin', 'operator', 'noRole']),
  });
