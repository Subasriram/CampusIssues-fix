import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Issue } from "../types/issue";

interface IssueState {
  issues: Issue[];
}

const initialState: IssueState = {
  issues: [],
};

const issueSlice = createSlice({
  name: "issues",
  initialState,

  reducers: {
    addIssue: (state, action: PayloadAction<Issue>) => {
      state.issues.push(action.payload);
    },

    restoreIssues: (state, action: PayloadAction<Issue[]>) => {
      state.issues = action.payload;
    },

    updateIssue: (state, action: PayloadAction<Issue>) => {
      const index = state.issues.findIndex(
        (issue) => issue.id === action.payload.id
      );

      if (index !== -1) {
        state.issues[index] = action.payload;
      }
    },

    deleteIssue: (state, action: PayloadAction<string>) => {
      state.issues = state.issues.filter(
        (issue) => issue.id !== action.payload
      );
    },
  },
});

export const {
  addIssue,
  restoreIssues,
  updateIssue,
  deleteIssue,
} = issueSlice.actions;

export default issueSlice.reducer;