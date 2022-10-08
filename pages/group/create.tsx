import { Props } from "material-ui-popup-state";
import { NextPage } from "next";
import React from "react";
import GroupForm from "../../components/Group/GroupForm";

const Index: NextPage<Props> = (props: Props) => {
  return <GroupForm />;
};

export default Index;
