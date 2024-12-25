import DefaultLayout from "./Default";
import { FC, ReactNode } from "react";

const LayoutTypesMapping = {
  DefaultLayout
};

const defaultLayoutType = "DefaultLayout";

interface LayoutProps {
  asLayout?: keyof typeof LayoutTypesMapping;
  children: ReactNode;
  [key: string]: any;
}

const Layout: FC<LayoutProps> = ({
  asLayout = defaultLayoutType,
  children,
  ...rest
}) => {
  const LayoutType = LayoutTypesMapping[asLayout];

  if (!LayoutType) {
    throw new Error(`Unknown layout type: ${asLayout}`);
  }

  return (
    <LayoutType
      hideHeader={false}
      withSideBar={false}
      {...rest}
    >
      {children}
    </LayoutType>
  );
};

export default Layout;
