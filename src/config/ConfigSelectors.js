import {createSelector} from 'reselect';

const sidebar = state => state.configReducer.sidebar;

export const getSidebar = createSelector(
  [sidebar],
  sidebar => {
    if (sidebar !== undefined && Array.isArray(sidebar)) {
      return sidebar.map(item => (
        {
          title: item.title,
          path: '#/' + item.path
        }
      ));
    }

    return [];
  }
);

const wizzard = state => state.configReducer.wizzard;

export const getWizzard = createSelector(
    [wizzard],
    wizzard => {
        return wizzard;
    }
)