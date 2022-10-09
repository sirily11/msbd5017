import {
  alpha,
  Avatar,
  Box,
  Card,
  styled,
  Tab,
  Tabs,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";

const TabsWrapperStyle = styled("div")(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: "100%",
  display: "flex",
  position: "absolute",
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
}));

type BackgroundBlurProps = {
  blur?: number;
  opacity?: number;
  color?: string;
};

type BackgroundGradientProps = {
  direction?: string;
  startColor?: string;
  endColor?: string;
};

interface BackgroundImageProps extends BackgroundGradientProps {
  url?: string;
}

function getDirection(value = "bottom") {
  return {
    top: "to top",
    right: "to right",
    bottom: "to bottom",
    left: "to left",
  }[value];
}

function cssStyles(theme?: Theme) {
  return {
    bgBlur: (props?: BackgroundBlurProps) => {
      const color =
        props?.color || theme?.palette.background.default || "#000000";

      const blur = props?.blur || 6;
      const opacity = props?.opacity || 0.8;

      return {
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`, // Fix on Mobile
        backgroundColor: alpha(color, opacity),
      };
    },
  };
}

const RootStyle = styled("div")(({ theme }) => ({
  "&:before": {
    ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.main }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
}));

const InfoStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: "absolute",
  marginTop: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    right: "auto",
    display: "flex",
    alignItems: "center",
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

interface Profile {
  name?: string;
  description: string;
  avatar: string;
}

export default function ProfileCover({ name, avatar, description }: Profile) {
  return (
    <RootStyle>
      <InfoStyle>
        <Avatar
          sx={{
            mx: "auto",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "common.white",
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
          src={avatar}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: "common.white",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography variant="h5" fontWeight={"600"}>
            {name}
          </Typography>
          <Typography sx={{ opacity: 0.72 }}>{description}</Typography>
        </Box>
      </InfoStyle>
    </RootStyle>
  );
}

interface Props {
  name?: string;
  avatar: string;
  description: string;
}

export function UserInfoCard({ name, avatar, description }: Props) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        mb: 3,
        height: 280,
        position: "relative",
      }}
    >
      <ProfileCover name={name} avatar={avatar} description={description} />

      <TabsWrapperStyle>
        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={0}
        >
          <Tab label="General" disableRipple />
        </Tabs>
      </TabsWrapperStyle>
    </Card>
  );
}
