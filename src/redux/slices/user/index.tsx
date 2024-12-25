import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface Profile {
  email: string | null;
  name: string | null;
  profilePic: string | null;
  id: string | null;
  mobile: string | null;
  referralId: Record<string, any>;
}

interface UserState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  userData: any;
  profile: Profile;
  id: string | null;
}

// Initial state
const initialState: UserState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  userData: null,
  profile: {
    email: null,
    name: null,
    profilePic: null,
    id: null,
    mobile: null,
    referralId: {},
  },
  id: null,
};

// Create the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ accessToken: string; refreshToken: string; isLoggedIn: boolean }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    setUserDetail: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
      state.id = action.payload.id;
    },
    setUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  setToken,
  setUserDetail,
  setUserData,
} = userSlice.actions;

export default userSlice.reducer;
