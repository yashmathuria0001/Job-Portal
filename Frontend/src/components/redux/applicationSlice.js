import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name:'application',
    initialState:{
        applicants:null,
    },
    reducers:{
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
        },
        removeApplicant: (state, action) => {
            const id = action.payload;
            if (state.applicants?.applications) {
              state.applicants.applications = state.applicants.applications.filter(
                (applicant) => applicant._id !== id
              );
            }
          },
    }
});
export const {setAllApplicants,removeApplicant} = applicationSlice.actions;
export default applicationSlice.reducer;