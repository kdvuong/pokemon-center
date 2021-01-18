import InDevelopmentView from "components/common/components/InDevelopmentView";
import { withDrawerContext } from "contexts/Drawer.context";

export default withDrawerContext(InDevelopmentView, { toolbarVisible: false });
