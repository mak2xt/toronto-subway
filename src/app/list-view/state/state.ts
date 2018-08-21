import { createFeatureSelector } from "@ngrx/store";

export interface ListViewState {
  isExpanded: boolean;
  isHidden: boolean;
}

export const selectListView = createFeatureSelector<ListViewState>("listView");

export const initialListViewState: ListViewState = {
  isExpanded: false,
  isHidden: false
};
