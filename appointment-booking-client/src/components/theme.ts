import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  dashboard: {
    navBar: {
      height: 60,
      heightPx: "60px",
    },
  },
  navBar: {
    height: "60px",
    rawHeight: 60,
  },
  scheduler: {
    headerHeight: "30px",
  },
  dayView: {
    headerHeight: "65px",
    headerOffsetPixels: "125px",
    headerOffset: 125, // navBar height + dayView header height
    footerHeight: "90px",
    footerOffset: 90,
    appointmentBlockRadius: "9px",
    appointmentBlockColor: "#909090",
  },
  grid: {
    width: "100%",
    cellHeight: "15vw", // grid.width / 7
    maxWidth: "1300px",
    cellMaxHeight: "100px",
    borderColor: "#00000035",
  },
  font: {
    sm: "1rem",
    sm_med: "1.20rem",
    med: "1.5rem",
    med_lg: "1.75rem",
    lg: "2rem",
  },
  colors: {
    primary: "#5eab55",
    primaryLight: "#71d466",
    primaryLightFaded: "#71d466bb",
    primaryFaded: "#5eab5560",
    primaryMisted: "#deffe0",
    secondary: "#b3b97d",
    textPrimary: "#2e2e2e",
    textSecondary: "#ffffff",
    gray: "#454545",
    lightGray: "#45454555",
    shadeGray: "#90909020",
    error: "#ff4444",
    errorBackground: "#f7d7d7",
  },
  form: {
    height: "50px",
    fieldMaxWidth: "500px",
    footerHeight: "60px",
  },
  icons: {
    small: "1rem",
    medium: "2rem",
  },
};

declare module "styled-components" {
  export interface DefaultTheme {
    dashboard: {
      navBar: {
        height: number;
        heightPx: string;
      };
    };
    navBar: {
      height: string;
      rawHeight: number;
    };
    scheduler: {
      headerHeight: string;
    };
    dayView: {
      headerHeight: string;
      headerOffset: number;
      headerOffsetPixels: string;
      footerHeight: string;
      footerOffset: number;
      appointmentBlockRadius: string;
      appointmentBlockColor: string;
    };
    grid: {
      width: string;
      cellHeight: string;
      maxWidth: string;
      cellMaxHeight: string;
      borderColor: string;
    };
    font: {
      sm: string;
      sm_med: string;
      med: string;
      med_lg: string;
      lg: string;
    };
    colors: {
      primary: string;
      primaryLight: string;
      primaryLightFaded: string;
      primaryFaded: string;
      primaryMisted: string;
      secondary: string;
      textPrimary: string;
      textSecondary: string;
      gray: string;
      lightGray: string;
      shadeGray: string;
      error: string;
      errorBackground: string;
    };
    form: {
      height: string;
      fieldMaxWidth: string;
      footerHeight: string;
    };
    icons: {
      small: string;
      medium: string;
    };
  }
}
