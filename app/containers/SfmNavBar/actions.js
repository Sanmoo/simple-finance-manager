import { SET_DRAWER_OPEN } from './constants';

export function setDrawerOpen(open) {
  return {
    type: SET_DRAWER_OPEN,
    open,
  };
}
