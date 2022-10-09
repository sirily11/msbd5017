import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Props } from "material-ui-popup-state";
import { GetServerSideProps, NextPage } from "next";
import React from "react";
import GroupForm from "../../components/Group/GroupForm";

const Index: NextPage<Props> = (props: Props) => {
  return <GroupForm />;
};

export default Index;

export const getServerSideProps: GetServerSideProps<Props> = withPageAuth({
  redirectTo: "/signIn",
  async getServerSideProps(context) {
    return {
      props: {},
    };
  },
});
